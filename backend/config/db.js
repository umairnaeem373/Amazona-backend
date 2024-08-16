import mongoose from "mongoose";

const connectDB=(link)=>{
    try {
        mongoose.connect(link).then(
             db => console.log(`Mongodb connected ${db.connection.host}`.cyan.underline),
        )
    } catch (error) {
        console.log(`Error... ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB