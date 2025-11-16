import React from 'react'
import { Button } from '../ui/button'
import {MdPreview} from "react-icons/md"
import { Dialog, DialogTrigger } from '../ui/dialog'
import { DialogContent } from '@radix-ui/react-dialog'
import useDesigner from '../hooks/useDesigner'
import { FormElements } from '../FormElements/FormElements'
function PreviewDialogBtn() {
    const {elements} = useDesigner()
  return (
    <>
    <Dialog>
        <DialogTrigger asChild>
        <Button variant={"outline"} className='gap-2'>
                <MdPreview/>
                Preview
            </Button>
        </DialogTrigger>
        <DialogContent className='w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0'>
            <div className='px py-2 border-b'>
                <p className='text-lg font-bold text-muted-foreground'>
                    Form Preview
                </p>
                <p className='text-sm text-muted-foreground'>
                    This is how your form will look like to your users
                </p>
            </div>

            <div className='bg-accent flex flex-col grow items-center justify-center p-4 bg-[url(/graph-paper.svg)]'>

                <div className='max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-auto-y '>
                    {elements.map((element)=>{
                        const FromComponent = FormElements[element.type].formComponent
                        return <FromComponent elementInstance={element}/>
                    })}
                </div>

            </div>

        </DialogContent>
    </Dialog>
   
    </>
  )
}

export default PreviewDialogBtn