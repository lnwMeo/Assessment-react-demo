import { useEffect, useState } from "react";
import { type Employee, getTopEmployeesMock } from "@/mocks/topEmployees";

export function useTopEmployeesMock(delayMs = 600) {
    const [data, setData] = useState<Employee[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => {
            setData(getTopEmployeesMock(5))
            setLoading(false)
        }, delayMs);
        return () => clearTimeout(t)
    }, [delayMs])
    return { data, loading }
}