/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import connectToDB from "../server/dbConfig/dbConfig";

const Pagination = ({ searchParams }: { searchParams: string }) => {
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const limit = 5; // Set the number of items per page

    const getCourses = async (page: number) => {
        connectToDB();
        const response = await fetch(`/api/get-all-course?page=${page}&limit=${limit}`);
        const data = await response.json();
        const allCourses: any[] = data.courses;
        setAllCourses(allCourses);
        setTotalPages(data.totalPages); // Set total pages from the response
    }

    useEffect(() => {
        // Get the current page from searchParams
        const page = parseInt(searchParams['page']) || 1; 
        setCurrentPage(page);
        getCourses(page);
    }, [searchParams]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        getCourses(newPage);
    }

    return (
        <>
            <div className="flex flex-wrap rounded-md px-4 shadow-lg py-6 h-[600px] overflow-scroll no-scrollbar">
                {allCourses.map((course) =>
                    <div className="flex flex-col mx-4" key={course._id}>
                        <Link href={`/course/${course._id}/course-details`} className="flex flex-col justify-between rounded border bg-white text-black shadow-md w-[250px] h-[300px] font-sans mb-4">
                            <div className="flex flex-col gap-y-1 w-full">
                                <div>
                                    <img src={course.imageUrl} alt="Course Thumbnail" className="h-[100px] w-full object-cover" />
                                </div>
                                <div className="flex flex-col gap-y-1 min-h-[130px] justify-around py-2 px-4">
                                    <div className="text-[14px]">
                                        {course.title}
                                    </div>
                                    <div className="text-[14px]">
                                        {course.category}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center px-4 pb-6">
                                    <div className="bg-[#0056d2] text-white py-2 rounded-md px-5">
                                        Edit
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-2">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default Pagination;