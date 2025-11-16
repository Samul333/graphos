"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormElement, FormElementInstance } from "../FormElements/FormElements";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import  * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import {Form,FormControl,FormDescription,FormField,FormItem,FormMessage,FormLabel} from "../ui/form"

import { BsTextParagraph } from "react-icons/bs";
const type:ElementsType = "ParagraphField"

const extraAttributes = {
    text:"Text here",

}

const propertiesSchema = z.object({
    text:z.string().min(2).max(500),

})

export const ParagraphFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:BsTextParagraph,
        label:"Paragraph Field"
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
   const {text} = element.extraAttributes
   return  <div className="flex flex-col gap-2 w-full">
    <Label>
        Paragraph Field
    </Label>
    <p className="text-xl">{text}</p>
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
          text:element.extraAttributes.text
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
            name="text"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>Paragraph</FormLabel>
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