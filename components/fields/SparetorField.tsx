"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import  * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import {Form,FormControl,FormDescription,FormField,FormItem,FormMessage,FormLabel} from "../ui/form"
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { RiSeparator} from "react-icons/ri";
import {Separator} from "../ui/separator"
const type:ElementsType = "SeparatorField"



export const SeparatorFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
 
    }),
    designerBtnElement:{
        icon:RiSeparator,
        label:"Separator Field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,


    validate:()=>true

}



function FormComponent({elementInstance}:{elementInstance:FormElementInstance}){



    return  <Separator/>
 }
 




function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){

   return  <div className="flex flex-col gap-2 w-full">
    <Label>
        Separator Field Here
    </Label>
   <Separator/>
   </div>
}



function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
   
    return <p>No Properties for this element</p>

}