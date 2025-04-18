"use client"
import { useEffect, useState } from "react"
import { getBrowserTypes, getOsTypes, getDeviceTypes } from "@/helpers/clicksData"
import Link from 'next/link'
import { Button } from "../ui/button"
import Loading from "../Loading"

export default function URLInfo({ singleUrl, loading1 }) {
    const [device, setDevice] = useState([])
    const [os, setOS] = useState([])
    const [browser, setBrowser] = useState([])

    useEffect(() => {
        setBrowser(getBrowserTypes(singleUrl?.clicks))
        setOS(getOsTypes(singleUrl?.clicks))
        setDevice(getDeviceTypes(singleUrl?.clicks))
    }, [singleUrl])

    return (
        <div className="w-1/2 flex flex-col gap-1">
            <Link
                href={`http://localhost:3000/${singleUrl?.shortId}`}
                target="_blank"
                className="bg-cs-green text-cs-blue-dark text-center rounded-md py-1"
            >
                Visit Site
            </Link>
            <Button className="bg-red-500">Delete URL</Button>
            <div className="bg-white shadow-lg w-full h-full rounded-lg p-2 flex flex-col gap-3">
                {
                    loading1 ? (
                        <Loading />
                    ) : (
                        <>
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
                        </>
                    )
                }
            </div>
        </div>
    )
}