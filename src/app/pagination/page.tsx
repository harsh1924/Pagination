/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import connectToDB from "../server/dbConfig/dbConfig";

import data from "../../data/dataa.json";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = () => {
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    // const limit = 5; // Set the number of items per page

    const getCourses = async (page: number) => {
        connectToDB();
        const response = await fetch(`/api/get-all-course?page=${page}`);
        const data = await response.json();
        const allCourses: any[] = data.courses;
        setAllCourses(allCourses);
        setTotalPages(data.totalPages); // Set total pages from the response
    }

    useEffect(() => {
        // Get the current page from searchParams
        const storedPage = localStorage.getItem('currentPage');
        const page = storedPage ? parseInt(storedPage) : 1;
        setCurrentPage(page);
        getCourses(page);
    }, []);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        // Store the current page in Local Storage
        localStorage.setItem('currentPage', newPage.toString());
        getCourses(newPage);
    }

    let pageNumbers: Number[] = [];
    for (let i: number = currentPage - 2; i <= currentPage + 2; i++) {
        if (i < 1) continue;
        if (i > totalPages) break;
        pageNumbers.push(i);
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
                    <ArrowLeft />
                </button>
                <span className="mx-2">
                    {/* Page {currentPage} of {totalPages} */}
                    {/* {Array.from({ length: totalPages }, (_, index) => (
                        <span className="mr-1 cursor-pointer" key={index} onClick={() => handlePageChange(index + 1)} style={{ textDecoration: currentPage === index + 1 ? 'underline' : 'none' }}>
                            {index + 1}
                        </span>
                    ))} */}
                    {pageNumbers.map(pageNo => (
                        <span key={pageNo.toString()} className="mr-1 cursor-pointer" onClick={() => handlePageChange(parseInt(pageNo))} style={{ textDecoration: currentPage === pageNo ? 'underline' : 'none', color: currentPage === pageNo && 'red' }}>
                            {pageNo.toString()}
                        </span>
                    ))}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    <ArrowRight />
                </button>
                {currentPage}
            </div>
            <div className="">
                {data.map(data => (
                    <div key={data.name}>
                        {data.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Pagination;