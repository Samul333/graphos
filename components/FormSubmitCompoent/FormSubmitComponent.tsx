"use client";
import { HiCursorClick } from 'react-icons/hi';
import { FormElementInstance, FormElements } from '../FormElements/FormElements'
import { Button } from '../ui/button';
import { useCallback, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ImSpinner2 } from 'react-icons/im';
import { SubmitForm } from '@/actions/form';
import ReactConfetti from 'react-confetti';

function FormSubmitComponent({content,formUrl}:{
  formUrl:string,
  content:FormElementInstance[]
}) {

  const formValues = useRef<{[key:string]:string}>({})
  const formErrors = useRef<{[key:string]:boolean}>({})
  const [renderKey,setRenderKey] = useState(new Date().getTime())
  const [submitted,setSubmitted] = useState(false)

  const [pending,startTransition] = useTransition()

  const validateForm:()=>boolean= useCallback(()=>{
    for(const field of content){
      const actualValues = formValues.current[field.id] || ""
      const valid = FormElements[field.type].validate(field,actualValues)

      if(!valid){
        setRenderKey(new Date().getTime())
        formErrors.current[field.id] = true
      }

    }


    if(Object.keys(formErrors.current).length>0){
      return false
     }
    return true
  },[content])

  const submitValue = useCallback((key:string,value:string)=>{
  formValues.current[key] = value
  },[])

   const submitForm=async()=>{
      formErrors.current = {};
      const validForm = validateForm();
      if(!validForm){
        setRenderKey(new Date().getTime())
        toast("Error",{
          description:"Please check the form for errors"
        })
        return 
      }
      
      const jsonContent= JSON.stringify(formValues.current)
      await SubmitForm(formUrl,jsonContent)
      setSubmitted(true)


  }

  if(submitted){
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <ReactConfetti recycle={false} numberOfPieces={1000}/>
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form Submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting this form. You can now close this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div key={renderKey} className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        {
          content.map((element)=>{
            const FormElement = FormElements[element.type].formComponent;
            return <FormElement defaultValue = {formValues.current[element.id]} key={element.id} elementInstance={element} submitValue={submitValue} isInvalid={formErrors.current[element.id]}/>
          })
        }
        <Button className='mt-8' onClick={()=>{
          startTransition(submitForm)
        }} disabled={pending}>
        {!pending &&  <>
          <HiCursorClick></HiCursorClick>
          Submit
          </>}

          {pending && <ImSpinner2 className='animate-spin'/>}
    
        </Button>
      </div>
    </div>
  )
}

export default FormSubmitComponent