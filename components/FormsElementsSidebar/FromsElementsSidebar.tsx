import React from 'react'
import SidebarBtnElements from '../SidebarBtnElements/SidebarBtnElements'
import { FormElements } from '../FormElements/FormElements'
import {Separator} from "../ui/separator"
function FromsElementsSidebar() {
  return (
    <div>
        <p className="text-sm text-foreground/70">Drag and Drop elements</p>
        <Separator className='my-2'/>
        <div className="gird gird-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 place-items-center">

            <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
                Layout Elements
            </p>
           <div className='flex flex-row flex-wrap gap-4'>
            <SidebarBtnElements formElement={FormElements.TitleField}/>
            <SidebarBtnElements formElement={FormElements.SubTitleField}/>
            <SidebarBtnElements formElement={FormElements.ParagraphField}/>
            <SidebarBtnElements formElement={FormElements.SeparatorField}/>
            <SidebarBtnElements formElement={FormElements.SpacerField}/>



           </div> 

           <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start mt-3">
                Form Elements

              </p>
            <div className='flex flex-row flex-wrap gap-4'>
              <SidebarBtnElements formElement={FormElements.TextField}/>
           </div> 


        </div>
        

    </div>
  )
}

export default FromsElementsSidebar