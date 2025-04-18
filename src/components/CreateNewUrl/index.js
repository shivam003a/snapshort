'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"

export default function CreateNewUrl({ setIsNewAdded }) {
    const [longURL, setLongURL] = useState("")
    const [shortURL, setShortURL] = useState("")

    const handleNewUrl = async () => {
        try {
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
            toast.dismiss();
            toast.error("An unexpected error occurred.");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-cs-green text-cs-blue-dark">Create New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Url</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="longURL" className="font-poppins text-cs-gray text-xs">
                            Original URL
                        </Label>
                        <Input id="longURL" value={longURL} className="col-span-3" onChange={(e) => setLongURL(e?.target?.value)} />
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
                    <Button type="submit" onClick={handleNewUrl}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}