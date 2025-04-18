'use client'
import { getBrowserChartData, getDeviceChartData, getOsChartData } from "@/helpers/clicksData"
import { useEffect, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartInfo({ singleUrl }) {
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
        <div className="w-1/2 overflow-hidden bg-white shadow-lg rounded-lg p-2">
            <div className="flex">
                <span className="bg-cs-blue-dark text-cs-white p-1" onClick={() => setSelectedPieData("os")}>OS</span>
                <span className="bg-cs-blue-dark text-cs-white p-1" onClick={() => setSelectedPieData("browser")}>Browser</span>
                <span className="bg-cs-blue-dark text-cs-white p-1" onClick={() => setSelectedPieData("device")}>Device</span>
            </div>

            <div className="w-full h-full">
                {
                    browserPieData?.labels?.length > 0 ?
                        <Pie
                            data={selectedPieData === "os" ? osPieData : selectedPieData === "browser" ? browserPieData : devicePieData}
                        /> : (
                            <span>No Analytics Available</span>
                        )
                }
            </div>
        </div>
    )
}