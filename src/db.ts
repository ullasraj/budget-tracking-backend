import mongoose from "mongoose"

export const ConnectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://budget_tracker:qMbRP7k57wIU6ehg@cluster0.q8ursxt.mongodb.net/budget_tracking');
        console.log("Database connected successfully")
    }catch(err){
        console.error(err)
    }

}