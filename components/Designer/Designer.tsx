import React, { ElementType, useState } from "react";
import DesignerSidebar from "../DesignerSidebar/DesignerSidebar";
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn, idGenerator } from "@/lib/utils";
import { ElementsType, FormElement, FormElementInstance, FormElements } from "../FormElements/FormElements";
import useDesigner from "../hooks/useDesigner";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
function Designer() {

    const {elements,addElements,selectedElement,setSelectedElement,removeElement} = useDesigner();

    console.log(elements,"Here are the elements")
   useDndMonitor({
    onDragEnd:(event)=>{
        const {active,over} = event
        if(!active|| !over) return 

        const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
        const isDroppingOverDesginerDropArea = over?.data?.current?.isDesignerDropArea
        if(isDesignerBtnElement && isDroppingOverDesginerDropArea){
            const type = active.data.current?.type
            const newElement = FormElements[type as ElementsType].construct(
                idGenerator()
            )
            
            addElements(elements.length,newElement)
            return
        }

        const isDroppingOverDesignerElementTopHalf = over?.data?.current?.isTopHalfDesignerElement;
        const isDroppingOverDesignerElementBottomHalf = over?.data?.current?.isBottomHalfDesignerElement;

        const isDroppingOverDesignerElement= isDroppingOverDesignerElementBottomHalf || isDroppingOverDesignerElementTopHalf
        
        const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement

        if(droppingSidebarBtnOverDesignerElement){
            const type = active.data.current?.type
            const newElement = FormElements[type as ElementsType].construct(
                idGenerator()
            )

            const overELementIndex = elements.findIndex((el)=>el.id===over?.data?.current?.elementId)
            if(overELementIndex===-1){
                throw new Error("Element is not found")
            }

            let indexForNewElement = overELementIndex;

            if(isDroppingOverDesignerElementBottomHalf){
                indexForNewElement = overELementIndex+1
            }
            
            addElements(indexForNewElement,newElement)
            return;

        }

        const isDraggingDesignerElement = active?.data?.current?.isDesignerElement;

        const isDraggingOverAnotherDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement

        if(isDraggingOverAnotherDesignerElement){

            const activeId = active.data?.current?.elementId;
            const overId= over?.data?.current?.elementId

            const activeElementIndex = elements.findIndex((el)=>el.id===activeId)
            const overElementIndex = elements.findIndex((el)=>el.id===overId)

            if(activeElementIndex===-1|| overElementIndex === -1){
                throw new Error("Element not found")
            }

            let indexForNewElement = overElementIndex;

            if(isDroppingOverDesignerElementBottomHalf){
                indexForNewElement = overElementIndex+1
            }

            const activeElements = {...elements[activeElementIndex]}
            removeElement(activeId)
            addElements(indexForNewElement,activeElements)

        }

    }
   }) 
  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="pd-4 w-full" onClick={()=>{
        if(selectedElement)setSelectedElement(null)
      }}>
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justifu-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver && elements.length===0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length===0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

        {elements.length > 0 && <div className=" flex flex-col w-full gap-2 p-4">
                {elements.map((element)=>{
                    return <DesignerElementWrapper key={element.id} element={element}/>
                })}
            </div>}

        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
}


function DesignerElementWrapper({element}:{element:FormElementInstance}){
    const [isMouseOver,setMouseIsOver] = useState(false)
    const DesignerElement = FormElements[element.type].designerComponent
    const {removeElement,selectedElement,setSelectedElement} = useDesigner()
    const topHalf = useDroppable({
        id:element.id+"-top",
        data:{
            type:element.type,
            elementId:element.id,
            isTopHalfDesignerElement:true
        }

    })

    const bottomHalf = useDroppable({
        id:element.id+"-bottom",
        data:{
            type:element.type,
            elementId:element.id,
            isBottomHalfDesignerElement:true
        }

    })

    const draggable = useDraggable({
        id:element.id+"-drag-handler",
        data:{
            type:element.type,
            elementId:element.id,
            isDesignerElement:true
        }
    })

    if(draggable.isDragging) return null

    return <div onClick={(e)=>{e.stopPropagation();setSelectedElement(element)}} ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} onMouseOver={()=>setMouseIsOver(true)} onMouseLeave={()=>setMouseIsOver(false)} className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent right-inset">
    <div ref={topHalf.setNodeRef} className="absolute  w-full h-1/2"></div>
    <div ref={bottomHalf.setNodeRef} className="absolute bottom-0 w-full h-1/2 rounded-b-md"></div>
    {
        isMouseOver &&(
            <>  
            <div className="absolute right-0 h-full z-10">
                <Button
                    className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500 cursor-pointer"
                    variant={"outline"}
                    onClick={(e)=>{e.stopPropagation();removeElement(element.id)}}
                >
                    <BiSolidTrash color="red"/>
                </Button>
            </div>
                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"}>
                    <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
                </div>
            </>
        )
    }
    {
        topHalf.isOver &&(
            <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
        )
    }
    {
        bottomHalf.isOver &&(
            <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none"></div>
        )
    }
    <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-now",isMouseOver&&"opacity-30",
    
        // topHalf.isOver && "border-t-4 border-t-foreground",
        // bottomHalf.isOver && "border-b-4 border-b-foreground"
    )}>
             <DesignerElement elementInstance={element}/>
    </div>

    </div>


}

export default Designer;
