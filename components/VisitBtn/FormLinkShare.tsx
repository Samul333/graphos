"use client";

import { ImShare } from "react-icons/im";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useEffect, useState } from "react";

function FormLinkShare({shareUrl}:{shareUrl:string}) {

  const [mounted,setMounted] = useState(false)
  useEffect(()=>{
    setMounted(true)
  },[])
  let shareLink=""
  if(mounted){
    shareLink = `${window.location.origin}/submit/${shareUrl}`
  }
  

  return (
    <div className="flex flex-grow gap-4 items-center">
        <Input value={shareLink} readOnly/>
        <Button className="max-w-[250px]" onClick={()=>{
            navigator.clipboard.writeText(shareLink)
            toast("Copied",{
                description:"The link has been copied to your clipboard"
            })
        }}>
            <ImShare/>
            Share Link
        </Button>
    </div>
  )
}

export default FormLinkShare