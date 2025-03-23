"use client";

import useCourses from "@/hooks/useCourses";

const TestPage = () => {
    const { courses, error, loading } = useCourses();
    if (error) return <div>Error: {error.message}</div>;
    if (loading) {
        return <div>Loading courses...</div>;
    }

    console.log(courses);

    return (
        <>
            {courses.map(course => (
                <li key={course._id}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                </li>
            ))}
        </>
    );
}

export default TestPage;