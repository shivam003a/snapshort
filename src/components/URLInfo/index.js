"use client"
import { useEffect, useState } from "react"
import { getBrowserTypes, getOsTypes, getDeviceTypes } from "@/helpers/clicksData"
import Link from 'next/link'
import { Button } from "../ui/button"
import Loading from "../Loading"
import { FiExternalLink } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast"
import { DeleteAlertDialog } from "../DeleteAlertDialog"

export default function URLInfo({ singleUrl, loading1, setIsNewAdded }) {
    const [device, setDevice] = useState([])
    const [os, setOS] = useState([])
    const [browser, setBrowser] = useState([])
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [isDelDialogShown, setIsDelDialogShown] = useState(false)

    useEffect(() => {
        setBrowser(getBrowserTypes(singleUrl?.clicks))
        setOS(getOsTypes(singleUrl?.clicks))
        setDevice(getDeviceTypes(singleUrl?.clicks))
    }, [singleUrl])

    const handleCopy = async () => {
        try {
            const toastId = toast.loading("Copying")
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${singleUrl?.shortId}`)

            toast.dismiss(toastId)
            toast.success("Copied!")
        } catch (e) {
            toast.dismiss()
        }
    }

    const handleDelete = async () => {
        setDeleteLoading(true)
        try {
            const toastId = toast.loading("deleting...")
            const response = await fetch(`/api/urls/${singleUrl?._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                },
                credentials: 'include'
            })
            const data = await response.json()
            toast.dismiss(toastId)

            if (response?.ok) {
                toast.success(data?.message)
                setIsNewAdded(prev => prev + 1)
            } else {
                toast.error(data?.message)
            }
        } catch (e) {
            toast.dismiss()
        }
        setDeleteLoading(false)
    }

    return (
        <div className="w-full md:w-1/2 flex flex-col gap-1">
            <Link
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${singleUrl?.shortId}`}
                target="_blank"
                prefetch={false}
                className="bg-cs-green text-cs-blue-light text-center rounded-md py-1.25 flex items-center justify-center font-poppins hover:border-2 hover:border-cs-green hover:bg-cs-blue-dark hover:text-cs-green"
            >
                Visit Site&nbsp;
                <FiExternalLink />
            </Link>
            <Button
                className="bg-red-400 font-poppins hover:bg-red-500 cursor-pointer"
                onClick={() => setIsDelDialogShown(true)}
            >
                Delete URL
                {deleteLoading && <Loading />}
            </Button>
            <div className="bg-white shadow-lg w-full h-full rounded-lg p-2 flex flex-col gap-3">
                {
                    loading1 ? (
                        <Loading />
                    ) : (
                        <>
                            <div>
                                <p className='font-poppins text-black text-xs'>shortURL</p>
                                <p className='font-poppins text-cs-gray text-sm flex gap-2 items-center'>
                                    {process.env.NEXT_PUBLIC_BASE_URL}/{singleUrl?.shortId}
                                    <FiCopy className="cursor-pointer" onClick={handleCopy} />
                                </p>
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
                                browser && browser?.length > 0 && <div>
                                    <p className='font-poppins text-black text-xs'>browserTypes</p>
                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-1'>
                                        {
                                            browser && browser?.length > 0 && browser.map((b, index) => (
                                                <span key={index} className="py-0.25 px-0.75 rounded-lg bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{b}</span>
                                            ))
                                        }
                                    </p>
                                </div>
                            }
                            {
                                os && os?.length > 0 && <div>
                                    <p className='font-poppins text-black text-xs'>osTypes</p>
                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-1'>
                                        {
                                            os && os?.length > 0 && os.map((o, index) => (
                                                <span key={index} className="py-0.25 px-0.75 rounded-lg bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{o}</span>
                                            ))
                                        }
                                    </p>
                                </div>
                            }
                            {
                                device && device?.length > 0 && <div>
                                    <p className='font-poppins text-black text-xs'>deviceTypes</p>
                                    <p className='font-poppins text-cs-gray text-sm flex flex-wrap gap-1'>
                                        {
                                            device && device?.length > 0 && device.map((d, index) => (
                                                <span key={index} className="py-0.25 px-0.75 rounded-lg bg-cs-blue-dark text-xs font-light text-cs-white font-poppins">{d}</span>
                                            ))
                                        }
                                    </p>
                                </div>
                            }
                        </>
                    )
                }
                <DeleteAlertDialog
                    isDelDialogShown={isDelDialogShown}
                    setIsDelDialogShown={setIsDelDialogShown}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    )
}