import React from 'react'
import {  FormElements } from '../FormElements/FormElements'
import SidebarBtnElements from '../SidebarBtnElements/SidebarBtnElements'
import useDesigner from '../hooks/useDesigner'
import PropertiesSidebar from '../PropertiesSidebar/PropertiesSidebar'
import FromsElementsSidebar from '../FormsElementsSidebar/FromsElementsSidebar'

function DesignerSidebar() {
  const {selectedElement} = useDesigner()
  return (
    <aside className=" w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
        Elements
      {!selectedElement && <FromsElementsSidebar/>}

    {selectedElement && <PropertiesSidebar/>}
    </aside>
  )
}

export default DesignerSidebar