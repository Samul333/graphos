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
import {RxDropdownMenu} from "react-icons/rx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
const type:ElementsType = "SelectField"

const extraAttributes = {
    label:"Select field",
    helperText:"Helper Text",
    required:false,
    placeHolder:"Value here...",
    options:[]
}

const propertiesSchema = z.object({
    label:z.string().min(2).max(30),
    helperText:z.string().max(200),
    required:z.boolean(),
    placeHolder:z.string().max(50),
    options:z.array(z.string())
})

export const SelectFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:RxDropdownMenu,
        label:"Select Field"
    },
    designerComponent:DesignerComponent,
    formComponent:FormComponent,
    propertiesComponent:PropertiesComponent,


    validate:(fromElement:FormElementInstance,currentValue:string):boolean=>{
        const element = fromElement as CustomInstance;
        if(element.extraAttributes.required){
            return currentValue.length>0;
        }

        return true
    }

}

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes
}


function FormComponent({elementInstance,submitValue,isInvalid,defaultValue}:{elementInstance:FormElementInstance,submitValue?: (key:string,value:string)=>void,isInvalid?:boolean,defaultValue?:string}){
    const element = elementInstance as CustomInstance 
    const {label,required,placeHolder,helperText,options} = element.extraAttributes
    const [value,setValue] = useState(defaultValue||"")
    const [error,setError] = useState(false)

    useEffect(()=>{
        setError(isInvalid===true)
    },[isInvalid])

    return  <div className="flex flex-col gap-2 w-full">
     <Label className={cn(error&&"text-red-500")}>
         {label}
         {required && "*"}
     </Label>
     <Select onValueChange={value=>{
        setValue(value);
        if(!submitValue) return 
        const valid = SelectFieldFormElement.validate(element,value)
        setError(!valid)
        submitValue(element.id,value)

     }}>
        <SelectTrigger className={cn("w-full",error&&"border-red-400")}>
            <SelectValue placeholder={placeHolder}></SelectValue>
        </SelectTrigger>
        <SelectContent>
                {options.map(option=>(
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
        </SelectContent>
    </Select>
     {
         helperText && (
             <p className={cn("text-muted-foreground text-[0.8rem]",error && "text-red-500")}>{helperText}</p>
         )
     }
    </div>
 }
 




function DesignerComponent({elementInstance}:{elementInstance:FormElementInstance}){
   const element = elementInstance as CustomInstance 
   const {label,required,placeHolder,helperText} = element.extraAttributes
   return  <div className="flex flex-col gap-2 w-full">
    <Label>
        {label}
        {required && "*"}
    </Label>
    <Select>
        <SelectTrigger className="w-full">
            <SelectValue placeholder={placeHolder}></SelectValue>
        </SelectTrigger>
    </Select>
    {
        helperText && (
            <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )
    }
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
            label:element.extraAttributes.label,
            required:true,
            helperText:element.extraAttributes.helperText,
            placeHolder:element.extraAttributes.placeHolder,
            options:element.extraAttributes.options
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
            name="label"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>Label</FormLabel>
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



            <FormField control={form.control}
            name="placeHolder"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>PlaceHolder</FormLabel>
                    <FormControl>
                        <Input onKeyDown={(e)=>{
                            if(e.key==="Enter")e.currentTarget.blur()
                        }} {...field}></Input>
                    </FormControl>
                    <FormDescription>
                        The placeHolder of the field. <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
            >



            </FormField>


            <FormField control={form.control}
            name="helperText"
            render={({field})=>{
                return <FormItem>
                    <FormLabel>Helper Text</FormLabel>
                    <FormControl>
                        <Input onKeyDown={(e)=>{
                            if(e.key==="Enter")e.currentTarget.blur()
                        }} {...field}></Input>
                    </FormControl>
                    <FormDescription>
                        The Helper Text of the field. <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
            >



            </FormField>

            <FormField control={form.control}
            name="required"
            render={({field})=>{
         
                return <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-md">
                    <div className="space-y-0.5">
            
                    <FormLabel>Required</FormLabel>
                  
                    <FormDescription>
                        The Helper Text of the field. <br/> It will be displayed above the field
                    </FormDescription>
                                
                    </div>

                    <FormControl>
                            <input className="w-5 h-5 cursor-pointer" type="checkbox" checked={field.value} onChange={(e)=>{field.onChange(e.target.checked)}}/>
                      {/* <Switch checked={field.value} onClick={(e)=>{console.log(e.target)}} onChange={(e)=>{console.log(e);field.onChange(e)}}></Switch> */}
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            }}
            >



            </FormField>


            <FormField control={form.control}
            name="options"
            render={({field})=>{
                return <FormItem>
                    
                    <div className="fkex justify-between items-center">
                     <FormLabel>Options</FormLabel>
                     <Button variant={"outline"} className="gap-2" onClick={e=>{
                        e.preventDefault();
                        form.setValue("options",field.value.concat("New Option"))
                     }}>
                         <AiOutlinePlus/>
                         Add
                     </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                        {form.watch("options").map((option,index)=>{
                            return <div key={index} className="flex items-center justify-between gap-1">
                                <Input placeholder=" " value={option} onChange={e=>{
                                    field.value[index] = e.target.value;
                                    field.onChange(field.value)
                                }}/>
                                <Button variant={"ghost"} size={"icon"} onClick={e=>{
                                    e.preventDefault();
                                    const newOptions = [...field.value]
                                    newOptions.splice(index,1)
                                    field.onChange(newOptions)
                                }}>
                                    <AiOutlineClose/>
                                </Button>
                            </div>
                        })}
                    </div>
                    <FormDescription>
                        The Helper Text of the field. <br/> It will be displayed above the field
                    </FormDescription>
                    <FormMessage/>
                </FormItem>
            }}
            >



            </FormField>

        </form>
    </Form>

}