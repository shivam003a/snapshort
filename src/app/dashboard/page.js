'use client'
import CreateNewUrl from "@/components/CreateNewUrl"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import URLInfo from "@/components/URLInfo"
import PieChartInfo from "@/components/PieChartInfo"
import { updateUser } from "@/redux/userSlice"

export default function Dashboard() {
    const { user } = useSelector((state) => state.user);
    const router = useRouter()
    const dispatch = useDispatch()
    const [urls, setUrls] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedUrl, setSelectedUrl] = useState('')
    const [singleUrl, setSingleUrl] = useState(null)
    const [loading1, setLoading1] = useState(false)
    const [isNewAdded, setIsNewAdded] = useState(0)

    useEffect(() => {
        const checkIsUserLogged = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    method: "GET",
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    },
                    credentials: 'include'
                })
                const data = await response.json()

                if (response?.ok) {
                    dispatch(updateUser(data?.data))
                } else {
                    router.push('/')
                    dispatch(updateUser(null))
                }
            } catch (e) {
                router.push('/')
                dispatch(updateUser(null))
            }
        }

        checkIsUserLogged()
    }, [router])


    useEffect(() => {
        const fetchUrl = async () => {
            setLoading(true)

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

        fetchUrl()
    }, [isNewAdded])

    useEffect(() => {
        const fetchSingleUrlData = async () => {
            setLoading1(true)

            if (!selectedUrl) {
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

        fetchSingleUrlData()
    }, [selectedUrl])

    if (!user) {
        return (
            <Loading large={true} />
        );
    }

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
                                    {
                                        loading1 ? (<Loading />) : (
                                            <>
                                                <PieChartInfo singleUrl={singleUrl} />
                                                <URLInfo singleUrl={singleUrl} />
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}