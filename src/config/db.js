import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB(){
    if(isConnected){
        return;
    }

    const DB_URI = process?.env?.MONGO_DB
    if(!DB_URI){
        throw new Error("MONGO_DB Connection URL not present")
    }

    try{
        await mongoose.connect(DB_URI, {
            dbName: 'urlShortenerDB'
        })
        isConnected = true;
        console.log("Connected to MongoDB")

    }catch(e){
        console.log(e?.message || "error connecting to db")
        process.exit(1)
    }
}