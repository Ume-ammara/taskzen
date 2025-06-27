import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db connected")
    } catch (error) {
        console.error("MongoDb n connection failed", error)
        process.exit(1)
    }
}

export default connectDB