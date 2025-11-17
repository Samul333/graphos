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
import { Checkbox } from "../ui/checkbox";
import { BsCalendar2 } from "react-icons/bs";
import { Button } from "../ui/button";
import { CalendarRangeIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {Calendar} from "../ui/calendar"
const type:ElementsType = "DateField"

const extraAttributes = {
    label:"Date Field",
    helperText:"Pick a date",
    required:false,

}

const propertiesSchema = z.object({
    label:z.string().min(2).max(30),
    helperText:z.string().max(200),
    required:z.boolean(),
})

export const DateFieldFormElement:FormElement= {
    type,
    construct:(id:string)=>({
        id,
        type,
        extraAttributes
    }),
    designerBtnElement:{
        icon:BsCalendar2,
        label:"Date Field"
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
    const {label,required,placeHolder,helperText} = element.extraAttributes
    const [date,setDate]= useState<Date|undefined>(defaultValue?new Date(defaultValue):undefined)
    const [error,setError] = useState(false)

    useEffect(()=>{
        setError(isInvalid===true)
    },[isInvalid])

    return  <div className="flex flex-col gap-2 w-full">
     <Label className={cn(error&&"text-red-500")}>
         {label}
         {required && "*"}
     </Label>
    <Popover>
        <PopoverTrigger>
        <Button variant={"outline"} className={cn("w-full justify-start text-left",!date && "text-muted-foreground",error&&"border-red-500")}>
                <CalendarRangeIcon></CalendarRangeIcon>
                {date? format(date,"PPP"):  <span>Pick a date</span>}
              
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" autoFocus selected={date} onSelect={(date)=>{
                    setDate(date);
                    if(!submitValue) return 
                    const value = date?.toUTCString() || ""
                    const valid = DateFieldFormElement.validate(element,value)
                    setError(!valid);
                    submitValue(element.id,value)

                }} 
                />
        </PopoverContent>
    </Popover>
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
    <Button variant={"outline"} className="w-full justify-start text-left">
        <CalendarRangeIcon></CalendarRangeIcon>
        <span>Pick a ate</span>
    </Button>
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

        </form>
    </Form>

}