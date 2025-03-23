/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import mongoose from "mongoose";

const connectToDB = async () => {
    try {

        const DB_URL = process.env.MONGODB_URI

        const { connection } = await mongoose.connect(DB_URL!);

        if (connection) {
            console.log(`Connected to MongoDB:`);
        }
    } catch (error: any) {
        console.log(error.message);
    }
};

export default connectToDB