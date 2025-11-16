import { GetFormContentByUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements/FormElements'
import FormSubmitComponent from '@/components/FormSubmitCompoent/FormSubmitComponent'
import React from 'react'

async function SubmitPage(props: { params: Promise<{ formUrl: string }> }) {
    const {formUrl} = await props.params
    const form = await GetFormContentByUrl(formUrl)
    if(!form) throw new Error("Form content not found!")

    const formContent = JSON.parse(form.content) as FormElementInstance[]
  return (
    <FormSubmitComponent formUrl={formUrl} content={formContent}/>
  )
}

export default SubmitPage