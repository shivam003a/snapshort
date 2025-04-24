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
    const [type, setType] = useState('day')

    useEffect(() => {
        if (singleUrl?.clicks) {
            const timeChart = getTodayVisitData(singleUrl.clicks, type);
            setTimeData(timeChart);
        }
    }, [singleUrl, type]);

    return (
        <div className="mb-4">
            <div className="bg-white shadow-lg w-full h-full rounded-lg p-2 flex flex-col gap-3">
                {loading1 ? (
                    <Loading />
                ) : (
                    timeData && <>
                        <div className="flex justify-between items-center gap-2">
                            <h3 className="font-poppins text-sm text-cs-blue-dark">Visits Today</h3>
                            <div className="flex justify-center items-center gap-2">
                                <span className="font-poppins text-xs text-cs-blue-dark">Select View</span>
                                <select
                                    className="font-poppins border-1 border-cs-blue-dark text-xs py-0.25 px-0.5 focus:outline-0 cursor-pointer text-cs-blue-dark"
                                    onChange={(e) => setType(e?.target?.value)}
                                >
                                    <option name="day" value="day">Day</option>
                                    <option name="week" value="week">Week</option>
                                    <option name="month" value="month">Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="border-b-1 border-cs-gray w-full -mt-0.75"></div>
                        <Bar data={timeData} />
                    </>
                )}
            </div>
        </div>
    )
}