"use client";
import { Form } from '@/lib/generated/prisma/client';
import React, { useEffect } from 'react'
import PreviewDialogBtn from '../PreviewDialogBtn/PreviewDialogBtn';
import SaveFormBtn from '../SaveFormBtn/SaveFormBtn';
import PublishFormBtn from '../PublishFormBtn/PublishFormBtn';
import Designer from '../Designer/Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '../DragOverlayWrapper/DragOverlayWrapper';
import useDesigner from '../hooks/useDesigner';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import Confetti from "react-confetti"
function FormBuilder({form,isTest=false}:{form:Form,isTest?:boolean}) {

    const {setElements} = useDesigner()
    useEffect(()=>{
        if(!isTest){
            const elements = JSON.parse(form.content)
            setElements(elements)
        }

    },[form,setElements])

    const mouseSensor = useSensor(MouseSensor,{
        activationConstraint:{
            distance:10
        }
    })

    const touchSensor = useSensor(TouchSensor,{
        activationConstraint:{
            delay:300,
            tolerance:5
        }
    })

    const sensors = useSensors(mouseSensor,touchSensor)
    const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

    if(form.published){

        return (
            <>
                <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={1000}/>
                <div className='flex flex-col items-center justify-center h-full w-full'>

                    <div className='max-w-md'>

                        <h1 className='text-center text-4xl font-bold text-primary border-b pd-2 mb-10 '>
                            Form Published
                        </h1>
                        <h2 className='text-2xl'>Share this form</h2>
                        <h3>Any one with the link can submit this form</h3>

                        <div className='my-4 flex flex-col gap-2 items-center w-full border-b pd-4'>
                            <Input className="w-full" readOnly value={shareUrl}/>
                            <Button className='mt-2 w-full' onClick={()=>{
                                navigator.clipboard.writeText(shareUrl)
                                toast("Copied",{
                                    description:"Link copied clipboard"
                                })
                            }}>
                                        Copy Link
                            </Button>
                        </div>

                        <div className='flex justify-between'>
                            <Button variant={"link"} asChild>
                                <Link href={"/"} className='gap-2'>
                                    <BsArrowRight/>
                                    Form Details
                                </Link>
                            </Button>
                        </div>

                    </div>

                </div>
            </>
        )

    }

  return (  
  <DndContext sensors={sensors}>


    <div className='flex flex-col w-full'>
        <div className='flex justify-between border b-2 p-4 gap-3 items-center'>
            <h2 className='truncate font-medium'>
                <span>Form</span>
                {form.name}
            </h2>

          {isTest && <div className='flex items-center gap-2'>
                <PreviewDialogBtn/>
            </div>}

          {!isTest &&  <div className='flex items-center gap-2'>
                <PreviewDialogBtn/>

                {!form.published && (
                    <>
                        <SaveFormBtn id={form.id}/>
                        <PublishFormBtn id={form.id}/>
                    </>
                )}

            </div>}

        </div>


        <div className='flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/graph-paper.svg)]'>
                    <Designer/>
        </div>



    </div>
    <DragOverlayWrapper/>
    </DndContext>
  )
}

export default FormBuilder