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
import { LuHeading1 } from "react-icons/lu";
const type:ElementsType = "TitleField"

const extraAttributes = {
    title:"Title field",

}

const propertiesSchema = z.object({
    title:z.string().min(2).max(50),

})

export const TitleFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:LuHeading1,
        label:"Title Field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,


    validate:()=>true

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function FormComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance 
    const {title} = element.extraAttributes



    return  <div className="flex flex-col gap-2 w-full">
            <p className="text-xl">{title}</p>
    </div>
 }
 




function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
   const element = elementInstance as CustomInstance 
   const {title} = element.extraAttributes
   return  <div className="flex flex-col gap-2 w-full">
    <Label>
        Title Field
    </Label>
    <p className="text-xl">{title}</p>
   </div>
}

type propertiesSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({elementInstance}:{elementInstance:FormElementInstance}){
    const element = elementInstance as CustomInstance
    const {updateElement} = useDesigner()
    const form = useForm<propertiesSchemaType>({
        resolver:zodResolver(propertiesSchema),
        mode:"onBlur",
        defaultValues:{
          title:element.extraAttributes.title
        }
    })

    useEffect(()=>{
        form.reset(element.extraAttributes)
    },[element,form])


    function applyChanges(values:propertiesSchemaType){
        updateElement(element.id,{
            ...element,
            extraAttributes:{
                ...values
            }
        })
    }

    return <Form {...form}>
        <form onSubmit={(e)=>{
            e.preventDefault();
        }} onBlur={form.handleSubmit(applyChanges)} className="space-y-3">
            <FormField control={form.control}
            name="title"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                        <Input onKeyDown={(e)=>{
                            if(e.key==="Enter")e.currentTarget.blur()
                        }} {...field}></Input>
                    </FormControl>
                    <FormDescription>
                        The label of the field. <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
            >



            </FormField>


        </form>
    </Form>

}