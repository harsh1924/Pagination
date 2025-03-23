import courseModel from "@/app/server/models/courseModel";
import { NextResponse } from "next/server";

export async function GET() {
    const courses = await courseModel.find({});
    // console.log(courses);
    

    return NextResponse.json({
        message: 'Courses Fetched Successfully',
        courses,
    });
}