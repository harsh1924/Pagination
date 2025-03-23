"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Course {
    _id: string; // Assuming _id is a string
    title: string;
    description: string;
    // Add other properties as needed
}

export default function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await axios.get('api/getCourses');
            setCourses(res.data.courses);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err); // Set the error if it's an instance of Error
            } else {
                setError(new Error("An unknown error occurred")); // Fallback for non-Error objects
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses()
    }, []);

    return { courses, error, loading }
}