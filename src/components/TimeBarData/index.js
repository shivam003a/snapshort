'use client'
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { getTodayVisitData } from "@/helpers/clicksData";
import Loading from "../Loading";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TimeBarData({ singleUrl, loading1 }) {
    const [timeData, setTimeData] = useState(null);

    useEffect(() => {
        if (singleUrl?.clicks) {
            const timeChart = getTodayVisitData(singleUrl.clicks);
            setTimeData(timeChart);
        }
    }, [singleUrl]);

    return (
        <div className="mb-4">
            {loading1 ? (<Loading />) : (
                timeData && (
                    <div className="bg-white shadow-lg w-full h-full rounded-lg p-2 flex flex-col gap-3">
                        <h3 className="font-poppins text-sm text-cs-blue-dark">Visits Today</h3>
                        <div className="border-b-1 border-cs-gray w-full -mt-0.75"></div>
                        <Bar data={timeData} />
                    </div>
                )
            )}
        </div>
    )
}