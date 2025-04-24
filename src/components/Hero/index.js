"use client"
import useAuthStatus from "@/lib/useAuthStatus";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthDialog from "../AuthDialog";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Hero() {
    const { user, loading } = useAuthStatus()
    const [open, setOpen] = useState(false)
    const [weeklyLinks, setWeeklyLinks] = useState(0)
    const router = useRouter()

    const handleNavigation = (e) => {
        e.preventDefault()

        if (user) {
            router.push('/dashboard')
        } else {
            setOpen(true)
        }
    }

    useEffect(() => {
        const getWeeklyCreatedLinks = async () => {
            try {
                const response = await fetch('/api/weekly-links', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                if (response?.ok) {
                    setWeeklyLinks(data?.data)
                }
            } catch (e) {
                toast.error("An unexpected error occurred.");
            }
        }

        getWeeklyCreatedLinks()
    }, [])

    return (
        <div className="w-full max-w-[1200px] mx-auto pb-10">
            <div className="w-16 px-2 py-4">
                <Link href="/">
                    <span className="text-2xl text-cs-green font-semibold font-poppins">snap</span>
                    <span className="text-2xl text-cs-white font-light font-poppins">/short</span>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 px-2 py-14 pb-6">
                {
                    weeklyLinks ? (
                        <p className="text-lg text-cs-green font-poppins">{weeklyLinks} new links shortened this week!</p>
                    ) : (
                        <p className="text-lg text-cs-green font-poppins">Your links, your data, your impact</p>
                    )
                }
                <p className="text-5xl md:text-7xl max-w-2/3 text-center font-bold text-cs-white font-poppins leading-12 md:leading-24">Shrink Your Links Expand Your Reach</p>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg text-cs-gray font-poppins text-center">Shorten and manage your links with ease.</p>
                    <p className="text-lg text-cs-gray font-poppins text-center">Signup to track clicks and view detailed insights.</p>
                </div>
                <button
                    className="bg-cs-green px-6 py-3 rounded-3xl font-poppins mt-4 text-lg cursor-pointer hover:border-2 hover:border-cs-green hover:bg-cs-blue-light hover:text-cs-green focus: focus:outline-0"
                    onClick={handleNavigation}
                >
                    Get Started – It’s Free
                </button>
            </div>
            <AuthDialog open={open} setOpen={setOpen} />
        </div>
    )
}