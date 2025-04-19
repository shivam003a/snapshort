import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp({ name, setName, email, setEmail, password, setPassword, errorMsg }) {
    return (
        <div className="w-full px-3 py-6 pb-10 bg-cs-blue-light flex flex-col gap-4 -mt-1 rounded-lg rounded-tl-none">
            <div className="flex flex-col gap-1.25">
                <Label className="font-poppins text-cs-white text-xs font-extralight">Name</Label>
                <Input
                    placeholder="Enter Name"
                    className="bg-cs-white text-cs-blue-dark border-0 outline-0"
                    value={name}
                    onChange={(e) => setName(e?.target?.value)}
                >
                </Input>
                {errorMsg?.name && <span className="text-xs text-red-500">{errorMsg?.name}</span>}
            </div>
            <div className="flex flex-col gap-1.25">
                <Label className="font-poppins text-cs-white text-xs font-extralight">E-Mail</Label>
                <Input
                    placeholder="Enter E-mail"
                    className="bg-cs-white text-cs-blue-dark border-0 outline-0"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                >
                </Input>
                {errorMsg?.email && <span className="text-xs text-red-500">{errorMsg?.email}</span>}
            </div>
            <div className="flex flex-col gap-1.25">
                <Label className="font-poppins text-cs-white text-xs font-extralight">Password</Label>
                <Input
                    placeholder="Enter Password"
                    className="bg-cs-white text-cs-blue-dark border-0 outline-0"
                    value={password}
                    onChange={(e) => setPassword(e?.target?.value)}
                >
                </Input>
                {errorMsg?.password && <span className="text-xs text-red-500">{errorMsg?.password}</span>}
            </div>
        </div>
    )
}