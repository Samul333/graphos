import { GetFormById, GetFormWithSubmission } from '@/actions/form'
import FormBuilder from '@/components/FormBuilder/FormBuilder'
import FormLinkShare from '@/components/VisitBtn/FormLinkShare'
import VisitBtn from '@/components/VisitBtn/VisitBtn'
import { StatsCard, StatsCards } from '../../page'
import { FileIcon, PercentCircle, ViewIcon } from 'lucide-react'
import { ElementsType, FormElementInstance } from '@/components/FormElements/FormElements'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDistance } from 'date-fns'
import { ElementType, ReactNode } from 'react'


async function FormDetailPage({
    params
}:{
    params:{
        id:string
    }
}) {




  
    const {id} = await params
    const form = await GetFormById(Number(id))
    if(!form) throw new Error("Form not found")
    const {visits,submissions} = form
    let submissionRate = 0;

    if(visits>0){
        submissionRate = (submissions/visits) * 100;
    }

    const boundRate = 100- submissionRate;
    if(!form){
        throw new Error("Form not found")
    }
  return (
    <>
    <div className="py-10 border-t border-b border-muted">
            <div className="flex justify-between container">
                <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                <VisitBtn shareUrl={form.shareUrl}/>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareUrl={form.shareUrl}/>
                </div>
            </div>
        </div>
        <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg-grid-cols-4 container">

        <StatsCard
                    title="Total visits"
                    icon={<ViewIcon className="text-blue-600"/>}
                    helperText="All time form Visits"
                    value={visits?.toLocaleString()+"%"||""}
                    loading={false}
                    className="shadow-md shadow-blue-400"
            />

            <StatsCard
                    title="Total submissions"
                    icon={<FileIcon className="text-yellow-600"/>}
                    helperText="All time submissions"
                    value={submissions?.toLocaleString()+"%"||""}
                    loading={false}
                    className="shadow-md shadow-blue-400"
            />

        <StatsCard
                    title="Submission Rate"
                    icon={<PercentCircle className="text-green-600"/>}
                    helperText="Visits that result in the submission rate"
                    value={submissionRate?.toLocaleString()||""}
                    loading={false}
                    className="shadow-md shadow-blue-400"
            />

        <StatsCard
                    title="Bounce Rate"
                    icon={<PercentCircle className="text-red-600"/>}
                    helperText="Visits that results in no submissions"
                    value={boundRate?.toLocaleString()||""}
                    loading={false}
                    className="shadow-md shadow-blue-400"
            />


        </div>


        <div className='container pt-10'>
            <SubmissionsTable id={form.id}/>
        </div>
        </>
  )
}


type Rows = {[key:string]:string} & {
    submittedAt:Date
}

async function SubmissionsTable({id}:{id:number}){

    const form = await GetFormWithSubmission(id);
    console.log(form)
    if(!form) throw new Error("Form not found")

    const formElement = JSON.parse(form.content) as FormElementInstance[]

    const columns:{
        id:string,
        label:string,
        required:boolean,
        type:ElementsType
    }[]=[]

    formElement.forEach((element)=>{
        switch(element.type){

            case "TextField":
                columns.push({
                    id:element.id,
                    label:element.extraAttributes?.label,
                    required:element.extraAttributes?.required,
                    type:element.type

                })
                break;

            default:
                break;

        }
    })

    const rows:Rows[]=[]
    form.formSubmissions.forEach((submission)=>{
        const content = JSON.parse(submission.content)
        rows.push({
            ...content,
            submittedAt:submission.createdAt
        })

    })

    return (
        <>
        <h1 className="text-2xl font-bold my-4">Submissions</h1>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column)=>(
                            <TableHead key={column.id} className='uppercase'>{column.label}</TableHead>
                        ))}
                        <TableHead className='text-muted-foreground text'>Submitted at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                        {rows.map((row,index)=>{

                            return <TableRow key={index}>

                                {columns.map((column)=>{
                                    return <RowCell key={column.id} type={column.type} value={row[column.id]}/>
                                })}

                                <TableCell className="text-muted-foreground text-right">
                                    {formatDistance(row.submittedAt,new Date(),{
                                        addSuffix:true
                                    })}
                                </TableCell>

                            </TableRow>

                        })}
                </TableBody>
            </Table>
        </div>
        </>
    )
}

function RowCell({type,value}:{type:ElementsType, value:string}){
    let node:ReactNode = value;

    return <TableCell>{node}</TableCell>

}

export default FormDetailPage