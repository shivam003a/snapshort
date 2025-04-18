"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import Loading from "@/components/Loading"
import { useDispatch } from "react-redux"
import { updateUser } from "@/redux/userSlice"

export default function AuthDialog({ open, setOpen }) {
    const [authMethod, setAuthMethod] = useState("signup")
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()

    const handleAuth = async (e) => {
        e.preventDefault()

        const pathToAcess = authMethod === 'signup' ? '/api/auth/register' : '/api/auth/login'
        try {
            setLoading(true)
            const toastId = toast.loading(`${authMethod === 'signup' ? 'Signing up' : 'Signing in'}...`)
            const response = await fetch(pathToAcess, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Aceept": 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await response.json()
            toast.dismiss(toastId);

            if (response?.ok) {
                toaszt.success(data.message || "Success!");
                dispatch(updateUser(data?.data))
                router.push('/dashboard')
            } else {
                toast.error(data.message || "Something went wrong");
                dispatch(updateUser(null))
            }
        } catch (e) {
            dispatch(updateUser(null))
            toast.dismiss();
            toast.error("An unexpected error occurred.");
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] bg-cs-white border-0">
                <DialogHeader>
                    <DialogTitle className="font-poppins">Access Your Account</DialogTitle>
                </DialogHeader>
                <div className="py-4 flex flex-col justify-center items-center">
                    <div className="w-full flex">
                        <span
                            className={`text-center px-4 py-2 font-poppins text-sm cursor-pointer ${authMethod === "signup" ? "bg-cs-blue-light text-cs-white" : ""}`}
                            onClick={() => setAuthMethod('signup')}
                        >
                            SignUp
                        </span>
                        <span
                            className={`text-center px-4 py-2 font-poppins text-sm cursor-pointer ${authMethod === "signin" ? "bg-cs-blue-light text-cs-white" : ""}`}
                            onClick={() => setAuthMethod('signin')}
                        >
                            SignIn
                        </span>
                    </div>
                    {
                        authMethod === 'signup' ? (
                            <SignUp
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                            />
                        ) : (
                            <SignIn
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                            />
                        )
                    }
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="bg-cs-green text-cs-blue-dark hover:bg-cs-green cursor-pointer"
                        onClick={handleAuth}
                    >
                        {authMethod === "signup" ? "Sign Up" : "Sign In"}
                        {loading && <Loading />}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}