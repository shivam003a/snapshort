"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { signinShcema, signupShcema } from "@/helpers/zodValidation"
import { z } from "zod"

export default function AuthDialog({ open, setOpen }) {
    const [authMethod, setAuthMethod] = useState("signin")
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState({})

    const router = useRouter()
    const dispatch = useDispatch()

    const handleAuth = async (e) => {
        e.preventDefault()

        const pathToAcess = authMethod === 'signup' ? '/api/auth/register' : '/api/auth/login'
        try {
            authMethod === 'signup' ? (
                signupShcema.parse({ name, email, password })
            ) : (
                signinShcema.parse({ email, password })
            )
            setErrorMsg({})

            setLoading(true)
            const toastId = toast.loading(`${authMethod === 'signup' ? 'Signing up' : 'Signing in'}...`)
            const response = await fetch(pathToAcess, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
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
                toast.success(data.message || "Success!");
                dispatch(updateUser(data?.data))
                router.push('/dashboard')
            } else {
                toast.error(data.message || "Something went wrong");
                dispatch(updateUser(null))
            }
        } catch (e) {
            if (e instanceof z.ZodError) {
                const errorMessage = {}
                e?.errors?.forEach(err => {
                    const field = err.path[0];
                    errorMessage[field] = err?.message
                })
                setErrorMsg(errorMessage)
            }
            else {
                dispatch(updateUser(null))
                toast.error("An unexpected error occurred.");
            }
            toast.dismiss();
        }
        setLoading(false)
    }

    const getSampleCredential = () => {
        setEmail('sample@mail.com')
        setPassword("Qwerty@123")
    }

    return (
        <Dialog open={open} onOpenChange={() => {
            setOpen(false)
            setErrorMsg({})
        }}>
            <DialogContent className="sm:max-w-[450px] bg-cs-white border-0">
                <DialogHeader>
                    <DialogTitle className="font-poppins">Access Your Account</DialogTitle>
                    <DialogDescription className="font-poppins text-cs-gray">Log in or create a new account to manage your links, track clicks, and explore insights</DialogDescription>
                </DialogHeader>
                <div className="py-4 flex flex-col justify-center items-center">
                    <div className="w-full flex">
                        <span
                            className={`text-center px-4 py-2 font-poppins text-sm cursor-pointer rounded-t-lg ${authMethod === "signin" ? "bg-cs-blue-light text-cs-white" : ""}`}
                            onClick={() => setAuthMethod('signin')}
                        >
                            SignIn
                        </span>
                        <span
                            className={`text-center px-4 py-2 font-poppins text-sm cursor-pointer rounded-t-lg ${authMethod === "signup" ? "bg-cs-blue-light text-cs-white" : ""}`}
                            onClick={() => setAuthMethod('signup')}
                        >
                            SignUp
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
                                errorMsg={errorMsg}
                            />
                        ) : (
                            <SignIn
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                errorMsg={errorMsg}
                            />
                        )
                    }
                </div>
                <DialogFooter>
                    <Button
                        className="bg-cs-blue-dark text-cs-green cursor-pointer rounded-3xl font-poppins hover:bg-cs-blue-light"
                        onClick={getSampleCredential}
                    >
                        Get Sample Credential
                    </Button>
                    <Button
                        type="submit"
                        className="bg-cs-green border-2 border-cs-green text-cs-blue-dark cursor-pointer rounded-3xl font-poppins hover:border-2 hover:border-cs-green hover:bg-cs-white"
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