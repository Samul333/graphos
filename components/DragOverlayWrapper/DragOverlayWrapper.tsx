
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementsOverlay } from '../SidebarBtnElements/SidebarBtnElements'
import { ElementsType, FormElements } from '../FormElements/FormElements'
import useDesigner from '../hooks/useDesigner'

function DragOverlayWrapper() {
    const {elements} = useDesigner()
    const [draggedItem,setDraggedItem] = useState<Active|null>(null)
    useDndMonitor({
        onDragStart:(event)=>{
           setDraggedItem(event.active)
        },
        onDragCancel:()=>{
            setDraggedItem(null)
        },
        onDragEnd:()=>{
            setDraggedItem(null)
        }
    })

  let node = <div>No drag overlaysss</div>
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement 

  const type = draggedItem?.data?.current?.type  as ElementsType
  if(isSidebarBtnElement){
    node = <SidebarBtnElementsOverlay formElement={FormElements[type]}/>
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;

  if(isDesignerElement){
    const elementId = draggedItem?.data?.current?.elementId
    const element = elements.find((el)=>el.id ===elementId)

    if(!element) return<div>Element not found</div>
    else{
        const DesignerElementComponent = FormElements[element.type].designerComponent
        node = <div className='flex bg-accent rounded-md w-full py-2 px-4 opacity-30'>
            <DesignerElementComponent elementInstance={element}/>
        </div>
    }

  }

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}

export default DragOverlayWrapper