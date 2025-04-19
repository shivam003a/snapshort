'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"
import Loading from "../Loading"
import { urlSchema } from "@/helpers/zodValidation"
import { z } from 'zod'

export default function CreateNewUrl({ setIsNewAdded }) {
    const [longURL, setLongURL] = useState("")
    const [shortURL, setShortURL] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState({})

    const handleNewUrl = async () => {
        setLoading(true)
        try {
            urlSchema.parse({
                link: longURL
            })
            setErrorMsg({})

            const toastId = toast.loading("Fetching Url Info...")
            const response = await fetch(`/api/shorten`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    originalUrl: longURL
                })
            })

            const data = await response.json()
            toast.dismiss(toastId)

            if (response?.ok) {
                setShortURL(data?.shortUrl)
                toast.success(data.message || "Success!");
                setIsNewAdded(prev => prev + 1)
            } else {
                setShortURL(null)
                toast.error(data.message || "Something went wrong");
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                const errorMessage = {}
                e?.errors?.forEach(err => {
                    const field = err.path[0];
                    errorMessage[field] = err?.message
                })
                console.log(e.errors)
                setErrorMsg(errorMessage)
            }
            else {
                toast.error("An unexpected error occurred.");
            }
            toast.dismiss();
        }
        setLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-cs-green text-cs-blue-dark font-poppins cursor-pointer hover:border-2 hover:border-cs-green hover:text-cs-green">Create New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New URL</DialogTitle>
                    <DialogDescription className="font-poppins text-cs-gray">Easily shorten long URLs, track clicks, and share your custom links with ease</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="longURL" className="font-poppins text-cs-blue-dark text-xs">
                            Original URL
                        </Label>
                        <Input id="longURL" value={longURL} placeholder="Enter Original URL" className="col-span-3" onChange={(e) => setLongURL(e?.target?.value)} />
                        {errorMsg?.link && <span className="text-xs text-red-500">{errorMsg?.link}</span>}
                    </div>
                    {
                        shortURL && <div className="flex flex-col gap-2">
                            <Label htmlFor="longURL" className="font-poppins text-cs-gray text-xs">
                                Short URL
                            </Label>
                            <Input id="longURL" value={longURL} className="col-span-3" readOnly />
                        </div>
                    }
                </div>
                <DialogFooter>
                    <Button type="submit" className="font-poppins bg-cs-green text-cs-blue-dark cursor-pointer hover:border-2 hover:border-cs-green hover:bg-cs-white hover:text-cs-blue-dark" onClick={handleNewUrl}>
                        Create
                        {loading && <Loading />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}