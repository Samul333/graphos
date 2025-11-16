import React, {  useTransition } from 'react'
import { Button } from '../ui/button'
import { MdOutline10Mp } from 'react-icons/md'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { FaIcons } from 'react-icons/fa'
import { toast } from 'sonner'
import { PublishFormAction } from '@/actions/form'
function PublishFormBtn({id}:{id:number}) {
  const [loading,startTranstion] = useTransition()

  async function PublishForm() {

    try{
      await PublishFormAction(id);
    }catch(err){
      toast("error",{
        description:"Something went wrong!!"
      })
    }

  }
  return (

    <AlertDialog>

      <AlertDialogTrigger asChild>
      <Button variant={"outline"} className='gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400'>
        <MdOutline10Mp/>
        Publish
    </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone, You will not be able to edit this form

            <br/>
            <span>After publishing this form you will make it avialabel to the public and will be able to collect submissions</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={loading}  onClick={(e)=>{e.preventDefault();startTranstion(PublishForm)}}>Proceed {loading && <FaIcons className='animate-spin'/>}</AlertDialogAction>
        </AlertDialogFooter>
     
      </AlertDialogContent>

    </AlertDialog>

  )
}

export default PublishFormBtn