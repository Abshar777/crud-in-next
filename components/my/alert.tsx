import React, { RefObject } from "react"
import {AlertDialog, AlertDialogAction,AlertDialogCancel, AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";

interface props{
  trigger:RefObject<HTMLButtonElement>;
  fn:()=>Promise<void>
}

const alert=({trigger,fn}:props)=>{
 return (
   <AlertDialog>
     <AlertDialogTrigger hidden ref={trigger}>Open</AlertDialogTrigger>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
         <AlertDialogDescription>
           This action cannot be undone. This will permanently delete your account
           and remove your data from our servers.
         </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Cancel</AlertDialogCancel>
         <Button onClick={()=>{fn()}} className="bg-primary">logout</Button>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
 )
}
export default alert