'use client'
import { getBrowserChartData, getDeviceChartData, getOsChartData } from "@/helpers/clicksData"
import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Loading from "../Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartInfo({ singleUrl, loading1 }) {
    const [osPieData, setOsPieData] = useState({})
    const [browserPieData, setBrowserPieData] = useState({})
    const [devicePieData, setDevicePieData] = useState({})
    const [selectedPieData, setSelectedPieData] = useState('os')

    useEffect(() => {
        setDevicePieData(getDeviceChartData(singleUrl?.clicks || []))
        setBrowserPieData(getBrowserChartData(singleUrl?.clicks || []))
        setOsPieData(getOsChartData(singleUrl?.clicks || []))
    }, [singleUrl])

    return (
        <div className="w-full md:w-1/2 overflow-hidden bg-white shadow-lg rounded-lg p-2">
            {
                loading1 ? (
                    <Loading />
                ) : (
                    <>
                        <div className="flex justify-between items-center gap-2">
                            <span className="font-poppins text-sm text-cs-blue-dark">
                                {
                                    selectedPieData === 'os'
                                        ? 'Operating System Breakdown'
                                        : selectedPieData === 'browser'
                                            ? 'Browser Usage Distribution'
                                            : 'Device Type Breakdown'
                                }
                            </span>
                            <div className="flex justify-center items-center gap-2">
                                <span className="font-poppins text-xs text-cs-blue-dark">Select View</span>
                                <select
                                    className="font-poppins border-1 border-cs-blue-dark text-xs py-0.25 px-0.5 focus:outline-0 cursor-pointer text-cs-blue-dark"
                                    onChange={(e) => setSelectedPieData(e?.target?.value)}
                                >
                                    <option value="os">OS</option>
                                    <option value="browser">Browser</option>
                                    <option value="device">Device</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-b-1 border-cs-gray w-full mt-2"></div>

                        <div className="w-full h-full flex items-center justify-center p-5">
                            {
                                browserPieData?.labels?.length > 0 ?
                                    <Pie
                                        data={selectedPieData === "os" ? osPieData : selectedPieData === "browser" ? browserPieData : devicePieData}
                                    /> : (
                                        <span className="font-poppins text-lg">No Analytics Available</span>
                                    )
                            }
                        </div>
                    </>
                )
            }
        </div>
    )
}