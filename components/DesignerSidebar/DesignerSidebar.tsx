import React from 'react'
import {  FormElements } from '../FormElements/FormElements'
import SidebarBtnElements from '../SidebarBtnElements/SidebarBtnElements'
import useDesigner from '../hooks/useDesigner'
import PropertiesSidebar from '../PropertiesSidebar/PropertiesSidebar'

function DesignerSidebar() {
  const {selectedElement} = useDesigner()
  return (
    <aside className=" w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
        Elements

    {!selectedElement &&    <SidebarBtnElements formElement={FormElements.TextField}/>}
   {!selectedElement &&  <SidebarBtnElements formElement={FormElements.TitleField}/>}
    {selectedElement && <PropertiesSidebar/>}
    </aside>
  )
}

export default DesignerSidebar