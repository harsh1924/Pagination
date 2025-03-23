import courseModel from "@/app/server/models/courseModel";
import { NextResponse } from "next/server";

export async function GET(request: { url: string | URL; }) {
    // Get the query parameters from the request URL
    const { searchParams } = new URL(request.url);
    
    // Default to page 1
    const page = parseInt(searchParams.get('page')!) || 1;

    // Default to 10 items per page
    const limit = 5;

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;

    // Fetch the courses with pagination
    const courses = await courseModel.find({}).skip(skip).limit(limit);

    // Get the total number of courses
    const totalCourses = await courseModel.countDocuments({});

    return NextResponse.json({
        message: 'Courses Fetched Successfully',
        courses,
        totalCourses,
        totalPages: Math.ceil(totalCourses / limit),
        currentPage: page,
    });
}