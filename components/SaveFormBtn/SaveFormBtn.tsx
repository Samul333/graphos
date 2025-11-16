import React, { startTransition, useTransition } from 'react'
import { Button } from '../ui/button'
import {HiSaveAs} from "react-icons/hi"
import useDesigner from '../hooks/useDesigner'
import { UpdateFormContent } from '@/actions/form'
import { toast } from 'sonner'
import {FaSpinner} from "react-icons/fa"
function SaveFormBtn({id}:{id:number}) {
    const {elements} = useDesigner()
    const [loading,setTransition] = useTransition()
  const updateFormContent = async()=>{
    try{
        const jsonElement = JSON.stringify(elements)
        await UpdateFormContent(id,jsonElement)

        toast("success",{
            description:"Your form has been saved"
        })

    }
    catch(err){

    }
  }

  return (
    <Button onClick={()=>{
        startTransition(updateFormContent)
    }} variant={"outline"} className='gap-2'>
        <HiSaveAs/>
        Save
        {loading && <FaSpinner/>}
    </Button>
  )
}

export default SaveFormBtn