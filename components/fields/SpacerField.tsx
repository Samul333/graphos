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
import { LuHeading1, LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "../ui/slider";
const type:ElementsType = "SpacerField"

const extraAttributes = {
    height:20,

}

const propertiesSchema = z.object({
    height:z.number().min(5).max(200),

})

export const SpacerFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:LuSeparatorHorizontal,
        label:"Spacer Field"
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
    const {height} = element.extraAttributes



    return  <div className="" style={{height,width:"100%"}}></div>
 }
 




function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
   const element = elementInstance as CustomInstance 
   const {height} = element.extraAttributes
   return  <div className="flex flex-col gap-2 w-full items-center">
    <Label>
        Spacer Field {height}px
    </Label>
    <LuSeparatorHorizontal/>
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
          height:element.extraAttributes.height
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
            name="height"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>Height px : {form.watch("height")}</FormLabel>
                    <FormControl>
                            <Slider defaultValue={[field.value]}
                                min={5} max={200} step={1}
                                onValueChange={(value)=>{
                                    field.onChange(value[0])
                                }}  
                            />
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