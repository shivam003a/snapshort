'use client'
import CreateNewUrl from "@/components/CreateNewUrl"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { getBrowserChartData, getBrowserTypes, getDeviceChartData, getDeviceTypes, getOsChartData, getOsTypes } from "@/helpers/clicksData"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from "next/link"

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Dashboard() {
    const { user } = useSelector((state) => state.user);
    const router = useRouter()
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState('')
    const [singleUrl, setSingleUrl] = useState(null)
    const [loading1, setLoading1] = useState(false)
    const [isNewAdded, setIsNewAdded] = useState(0)

    const [device, setDevice] = useState([])
    const [os, setOS] = useState([])
    const [browser, setBrowser] = useState([])

    const [osPieData, setOsPieData] = useState({})
    const [browserPieData, setBrowserPieData] = useState({})
    const [devicePieData, setDevicePieData] = useState({})

    const [selectedPieData, setSelectedPieData] = useState('os')

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user])

    if (!user) {
        return (
            <Loading large={true} />
        );
    }

    const fetchUrl = async () => {
        setLoading(true)

        if (!user) {
            return;
        }
        try {
            const toastId = toast.loading("Fetching Urls...")
            const response = await fetch('/api/urls', {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                }
            })
            const data = await response.json()
            toast.dismiss(toastId)

            if (response?.ok) {
                setUrls(data?.data)
                setSelectedUrl(data?.data?.[0]?._id)
                toast.success(data.message || "Success!");
            } else {
                setUrls([])
                setSelectedUrl("")
                toast.error(data.message || "Something went wrong");
            }
        } catch (e) {
            toast.dismiss();
            toast.error("An unexpected error occurred.");
        }
        setLoading(false)
    }

    const fetchSingleUrlData = async () => {
        setLoading1(true)

        if (!user) {
            return;
        }
        try {
            const toastId = toast.loading("Fetching Url Info...")
            const response = await fetch(`/api/urls/${selectedUrl}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                }
            })
            const data = await response.json()
            toast.dismiss(toastId)
            console.log(data?.data)

            if (response?.ok) {
                setSingleUrl(data?.data)
                toast.success(data.message || "Success!");
            } else {
                setSingleUrl([])
                toast.error(data.message || "Something went wrong");
            }
        } catch (e) {
            toast.dismiss();
            toast.error("An unexpected error occurred.");
        }
        setLoading1(false)
    }

    useEffect(() => {
        fetchUrl()
    }, [isNewAdded])

    useEffect(() => {
        if (selectedUrl) {
            fetchSingleUrlData()
        }
    }, [selectedUrl])

    useEffect(() => {
        if (singleUrl?.clicks) {
            setBrowser(getBrowserTypes(singleUrl?.clicks))
            setOS(getOsTypes(singleUrl?.clicks))
            setDevice(getDeviceTypes(singleUrl?.clicks))

            setDevicePieData(getDeviceChartData(singleUrl?.clicks))
            setBrowserPieData(getBrowserChartData(singleUrl?.clicks))
            setOsPieData(getOsChartData(singleUrl?.clicks))
        }

    }, [singleUrl])

    return (
        <>
            {
                loading ? (
                    <Loading large={true} />
                ) : (
                    <div className="bg-linear-to-t from-cs-blue-light to-cs-blue-dark h-screen overflow-hidden">
                        <div className="w-full h-screen max-w-[1200px] mx-auto pb-12">
                            <div className="h-16 px-2 py-4 flex justify-between">
                                <div>
                                    <Link href="/">
                                        <span className="text-2xl text-cs-green font-semibold font-poppins">snap</span>
                                        <span className="text-2xl text-cs-white font-light font-poppins">/short</span>
                                    </Link>
                                </div>
                                <div>
                                    <CreateNewUrl setIsNewAdded={setIsNewAdded} />
                                    <Button>Logout</Button>
                                </div>
                            </div>

                            <div className="flex flex-row px-2 py-2 h-full">
                                <div className="w-1/6 h-screen flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
                                    {
                                        urls && urls?.length && urls.map((url, index) => (
                                            <span
                                                className={`px-2 pl-4 py-4 rounded-l-3xl ${selectedUrl === url?._id ? "bg-cs-white text-cs-blue-dark" : "text-cs-white"}`}
                                                key={index}
                                                onClick={() => setSelectedUrl(url?._id)}
                                            >
                                                {url?.originalUrl?.length > 22 ? url?.originalUrl.slice(0, 22) : url?.originalUrl}
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className="w-5/6 bg-cs-blue-dark p-2 gap-1 overflow-x-hidden overflow-y-auto flex flex-row">
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
                                    <div className="w-1/2 flex flex-col gap-1">
                                        <Link href={`http://localhost:3000/${singleUrl?.shortId}`} target="_blank" className="bg-cs-green text-cs-blue-dark text-center rounded-md py-1">Visit Site</Link>
                                        <Button className="bg-red-500">Delete URL</Button>
                                        <div className="bg-white shadow-lg w-full h-full rounded-lg p-2 flex flex-col gap-3">
                                            <div>
                                                <p className='font-poppins text-black text-xs'>shortURL</p>
                                                <p className='font-poppins text-cs-gray text-sm'>http://localhost:3000/{singleUrl?.shortId}</p>
                                            </div>
                                            <div>
                                                <p className='font-poppins text-black text-xs'>shortId</p>
                                                <p className='font-poppins text-cs-gray text-sm'>{singleUrl?.shortId}</p>
                                            </div>
                                            <div>
                                                <p className='font-poppins text-black text-xs'>originalURL</p>
                                                <p className='font-poppins text-cs-gray text-sm'>{singleUrl?.originalUrl}</p>
                                            </div>
                                            <div>
                                                <p className='font-poppins text-black text-xs'>totalClicks</p>
                                                <p className='font-poppins text-cs-gray text-sm'>{singleUrl?.clickCount}</p>
                                            </div>
                                            {
                                                browser?.length > 0 && <div>
                                                    <p className='font-poppins text-black text-xs'>browserTypes</p>
                                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-2'>
                                                        {
                                                            browser && browser?.length > 0 && browser.map((b, index) => (
                                                                <span key={index} className="p-0.75 bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{b}</span>
                                                            ))
                                                        }
                                                    </p>
                                                </div>
                                            }
                                            {
                                                os?.length > 0 && <div>
                                                    <p className='font-poppins text-black text-xs'>osTypes</p>
                                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-2'>
                                                        {
                                                            os && os?.length > 0 && os.map((o, index) => (
                                                                <span key={index} className="p-0.75 bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{o}</span>
                                                            ))
                                                        }
                                                    </p>
                                                </div>
                                            }
                                            {
                                                device?.length > 0 && <div>
                                                    <p className='font-poppins text-black text-xs'>deviceTypes</p>
                                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-2'>
                                                        {
                                                            device && device?.length > 0 && device.map((d, index) => (
                                                                <span key={index} className="p-0.75 bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{d}</span>
                                                            ))
                                                        }
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}