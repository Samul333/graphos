
"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {BsFileEarmark} from "react-icons/bs"
import {ImSpinner2} from "react-icons/im"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Textarea } from "../ui/textarea"
import { toast } from "sonner"
import { formSchema, formSchemaType } from "@/schemas/form"
import { CreateForm } from "@/actions/form"
import {BsFileEarmarkPlus} from "react-icons/bs"
import { useRouter } from "next/navigation"

function CreateFormBtn() {
    const router = useRouter()
    const form = useForm<formSchemaType>({
        resolver:zodResolver(formSchema)
    })

    async function onSubmit(values:formSchemaType){
        try{

            const formId = await CreateForm(values)
            router.push(`/builder/${formId}`)
            toast("success",{
                description:"Created successfully"
            })

        }
        catch(err){
            toast("Error",{
                description:"Error something went wrong"
            })
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
        <Button variant={"outline"} className="group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 bg-background">
            <BsFileEarmarkPlus />
            <p className="font-bold">Create new form</p>
        </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create from</DialogTitle>
                <DialogDescription>
                    Create a new form to start collecting responses
                </DialogDescription>
            </DialogHeader>


            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}></Input>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >

                    </FormField>


                    <FormField
                        control={form.control}
                        name="description"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} {...field}></Textarea>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >

                    </FormField>




                </form>


            </Form>

            <DialogFooter>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="mt-4 w-full">
                    {!form.formState.isSubmitting &&<span>Save</span>}
                    {form.formState.isSubmitting && <ImSpinner2></ImSpinner2>}
                </Button>
            </DialogFooter>
         
        </DialogContent>
    </Dialog>
  )
}

export default CreateFormBtn