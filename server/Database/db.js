import mongoose from 'mongoose';

export const Connection = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongoose Connection is successfully..." );

    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1)
    }
}