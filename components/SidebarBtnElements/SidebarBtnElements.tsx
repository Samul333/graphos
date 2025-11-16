import React from 'react'
import { FormElement } from '../FormElements/FormElements'
import { Button } from '../ui/button'
import { useDraggable } from '@dnd-kit/core'

function SidebarBtnElements({formElement}:{formElement:FormElement}) {
  const {label,icon:Icon} =  formElement.designerBtnElement

  console.log(formElement,"Here is the form element")

  const draggable = useDraggable({
    id:`designer-btn-${formElement.type}`,
    data:{
        type:formElement.type,
        isDesignerBtnElement:true
    }
  })
  return (
    <Button ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} variant={"outline"} className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'>
        <Icon className={"h-8 w-8 cursor-grab"}/>
        <p>{label}</p>
    </Button>
  )
}



export function SidebarBtnElementsOverlay({formElement}:{formElement:FormElement}) {
    const {label,icon:Icon} =  formElement.designerBtnElement

    return (
      <Button  variant={"outline"} className='flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'>
          <Icon className={"h-8 w-8 cursor-grab"}/>
          <p>{label}</p>
      </Button>
    )
  }

export default SidebarBtnElements