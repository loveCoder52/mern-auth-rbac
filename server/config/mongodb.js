import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL, {
            dbName: DB_NAME,
        });
        console.log(`Database Connected successfully🚀 ${connectionInstance.connection.host}`);
        console.log(`Database: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    }
}

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async ()=>{
//     mongoose.connection.on('connected', ()=> console.log("database connected"));
//     await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`);
//     console.log();
    
// };

// export default connectDB;