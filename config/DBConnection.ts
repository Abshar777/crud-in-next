import mongoose from "mongoose";

type connectedDB ={ isConnected?:boolean  }

const connectedDB:connectedDB={}

 const connect=async ():Promise<void>=>{
    if(connectedDB.isConnected) return console.log("already connected");
   try{
     const db=await mongoose.connect(process.env.MONGODB_URI as string || "",{})
     connectedDB.isConnected=true
   }catch(error){
     console.log((error as Error).message)
   }
 }
export default connect; 