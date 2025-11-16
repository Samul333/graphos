import { GetForm, GetFormStats } from "@/actions/form"
import CreateFormBtn from "@/components/CreateForm/CreateFormBtn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle,CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Form } from "@/lib/generated/prisma/client"
import { Separator } from "@radix-ui/react-separator"
import { formatDistance } from "date-fns"
import { FileIcon, PercentCircle, ViewIcon } from "lucide-react"
import Link from "next/link"
import { ReactNode, Suspense } from "react"
import {LuView} from "react-icons/lu"
import {BiRightArrowAlt} from "react-icons/bi"
import { currentUser } from "@clerk/nextjs/server"
import LandingPage from "@/components/LandingPage/LandingPage"
async function Home() {
    
  const user = await currentUser()  


  if(!user?.id){

    return <LandingPage/>
  }

  return (
    <div className="container pt-4">
        <Suspense fallback={<StatsCards loading={true}/>}>
            <CardStatsWrapper/>
        </Suspense>

        <Separator className="my-6"></Separator>
        <h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
        <Separator className="my-6"></Separator>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CreateFormBtn/>
        <Suspense fallback={[1,2,3,4].map((el)=>(
            <FormCardSkeleton key={el}/>
        ))}>
            <FormCards/>
        </Suspense>
        </div>
    </div>
  )
}

async function CardStatsWrapper() {
    const stats = await GetFormStats()

    return <StatsCards loading={false} data={stats}/>
}

interface StatsCardsProps {
    data?:Awaited<ReturnType<typeof GetFormStats>>,
    loading:boolean
}

export function StatsCards(props:StatsCardsProps){

    const {data,loading} = props;


    return <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total visits"
                    icon={<ViewIcon className="text-blue-600"/>}
                    helperText="All time form Visits"
                    value={data?.visits?.toLocaleString()+"%"||""}
                    loading={loading}
                    className="shadow-md shadow-blue-400"
            />

            <StatsCard
                    title="Total submissions"
                    icon={<FileIcon className="text-yellow-600"/>}
                    helperText="All time submissions"
                    value={data?.submissions?.toLocaleString()+"%"||""}
                    loading={loading}
                    className="shadow-md shadow-blue-400"
            />

        <StatsCard
                    title="Submission Rate"
                    icon={<PercentCircle className="text-green-600"/>}
                    helperText="Visits that result in the submission rate"
                    value={data?.submissionRate?.toLocaleString()||""}
                    loading={loading}
                    className="shadow-md shadow-blue-400"
            />

        <StatsCard
                    title="Bounce Rate"
                    icon={<PercentCircle className="text-red-600"/>}
                    helperText="Visits that results in no submissions"
                    value={data?.boundRate?.toLocaleString()||""}
                    loading={loading}
                    className="shadow-md shadow-blue-400"
            />

                    

    </div>

}


export function StatsCard({
    title,value,
    icon,helperText,
    loading,
    className
}:{
    title:string,
    value:string,
    className:string,
    loading:boolean,
    icon:ReactNode,
    helperText:string
}){

    return <Card className={className}>
        <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
            </CardTitle>
            {icon}
        </CardHeader>

        <CardContent>
                <div className="text-2xl font-bold">
             {loading && <Skeleton><span className="opacity-0">0</span></Skeleton> }
             {!loading && value}
                </div>
              <p className="text-xs text-muted-foreground pt-1">{helperText}</p>  
        </CardContent>
    </Card>

}


function FormCardSkeleton(){

    return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full"></Skeleton>
}

async function FormCards(){
    const forms = await GetForm()

    return <>
    {forms.map((form)=>{
        return <FormCard key={form.id} form={form}/>
    })}
    </>
}


function FormCard({form}:{form:Form}){

    return <Card>
        <CardHeader>

            <CardTitle className="flex items-center gap-2 justify-between">
                <span className="truncate font-bold" >{form.name}</span>
                {form.published && <Badge>Published</Badge>}
              {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
            </CardTitle>

            <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                {formatDistance(form.createdAt,new Date(),{
                    addSuffix:true
                })}

                {form.published && (
                    <span className="flex items-center gap-2">
                        <LuView/>
                        <span>{form.visits.toLocaleString()}</span>

                        <LuView/>
                        <span>{form.submissions.toLocaleString()}</span>

                    </span>

                )}

            </CardDescription>

        </CardHeader>

        <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                    {form.description || "No Description"}
        </CardContent>

        <CardFooter>
            {form.published && (
                <Button asChild className="w-full mt-2 text-md gap-4">
                    <Link href={`/forms/${form.id}`}>View submissions<BiRightArrowAlt/></Link>
            
                </Button>
            )}

        {!form.published && (
                <Button asChild className="w-full mt-2 text-md gap-4">
                    <Link href={`/builder/${form.id}`}>Edit Form <BiRightArrowAlt/></Link>
            
                </Button>
            )}
        </CardFooter>

    </Card>

}

export default Home