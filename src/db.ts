import mongoose from "mongoose"

export const ConnectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/budget_tracking');
        console.log("Database connected successfully")
    }catch(err){
        console.error(err)
    }

}