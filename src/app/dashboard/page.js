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
import { logoutUser, updateUser } from "@/redux/userSlice"
import TimeBarData from "@/components/TimeBarData"
import Image from "next/image"

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
    const [logoutLoading, setLogoutLoading] = useState(false)

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

        fetchUrl()
    }, [isNewAdded, user])

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

    const handleLogout = async () => {
        setLogoutLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                },
                credentials: 'include'
            })
            const data = await response.json()

            if (response?.ok) {
                dispatch(logoutUser())
                router.push('/')
                toast.success(data?.message)
            } else {
                dispatch(logoutUser())
                router.push('/')
                toast.error(data?.message)
            }
        } catch (e) {
            dispatch(logoutUser())
            router.push('/')
            toast.error("Something went wrong")
        }
        setLogoutLoading(false)
    }

    const handleError = (e) => {
        e.target.src = '/assets/fallback.png'
        e.target.srcset = '/assets/fallback.png'
    };

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
                    <div className="bg-linear-to-t from-cs-blue-light to-cs-blue-dark overflow-hidden">
                        <div className="w-full h-screen max-w-[1200px] mx-auto pb-12">
                            <div className="h-16 px-2 py-4 flex justify-between">
                                <div>
                                    <Link href="/">
                                        <span className="text-2xl text-cs-green font-semibold font-poppins">snap</span>
                                        <span className="text-2xl text-cs-white font-light font-poppins">/short</span>
                                    </Link>
                                </div>
                                <div className="flex gap-1">
                                    <CreateNewUrl setIsNewAdded={setIsNewAdded} />
                                    <Button className="font-poppins bg-red-400 hover:bg-red-500 cursor-pointer" onClick={handleLogout}>Logout {logoutLoading && <Loading />}</Button>
                                </div>
                            </div>
                            {
                                (urls && urls?.length > 0) ? (


                                    <div className="flex flex-row px-2 py-2 h-full">
                                        <div className="w-fit h-[calc(100vh-72px)] flex flex-col gap-2 overflow-x-hidden overflow-y-auto scrollable">
                                            {
                                                urls && urls?.length && urls.map((url, index) => (
                                                    <span
                                                        className={`px-2 pl-4 py-4 rounded-l-3xl cursor-pointer flex gap-2 ${selectedUrl === url?._id ? "bg-cs-white text-cs-blue-dark" : "text-cs-white"}`}
                                                        key={index}
                                                        onClick={() => setSelectedUrl(url?._id)}
                                                    >
                                                        <Image
                                                            src={`https://www.google.com/s2/favicons?sz=32&domain_url=${url?.originalUrl}`}
                                                            width={18}
                                                            height={18}
                                                            alt="url favicon"
                                                            className="object-contain"
                                                            onError={handleError}
                                                        >
                                                        </Image>
                                                        <span className="font-poppins text-xs hidden md:block">{url?.originalUrl?.length > 23 ? url?.originalUrl.slice(0, 23) : url?.originalUrl}</span>
                                                    </span>
                                                ))
                                            }
                                        </div>
                                        <div className="w-full md:w-5/6 min-h-[calc(100vh-72px)] bg-cs-blue-dark px-2 gap-1 overflow-x-hidden overflow-y-scroll flex flex-col scrollable">
                                            <div className="w-full bg-cs-blue-dark gap-1 flex flex-col-reverse md:flex-row">
                                                <PieChartInfo singleUrl={singleUrl} loading1={loading1} />
                                                <URLInfo singleUrl={singleUrl} loading1={loading1} setIsNewAdded={setIsNewAdded} />
                                            </div>
                                            <div>
                                                <TimeBarData singleUrl={singleUrl} loading1={loading1} />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <span className="text-cs-white px-2 text-2xl font-poppins">You haven’t created any URLs yet.</span>
                                        <span className="text-cs-white px-2 text-2xl font-poppins"> Click the button above to get started!</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}