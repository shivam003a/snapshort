import Link from "next/link";

export default function Hero() {
    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="w-16 px-2 py-4">
                <span className="text-2xl text-cs-green font-semibold font-poppins">snap</span>
                <span className="text-2xl text-cs-white font-light font-poppins">/short</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-5 px-2 py-14 pb-6">
                <p className="text-lg text-cs-green font-poppins">12 new links shortened this week!</p>
                <p className="text-7xl max-w-2/3 text-center font-bold text-cs-white font-poppins leading-24">Shrink Your Links Expand Your Reach</p>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg text-cs-gray font-poppins">Shorten and manage your links with ease.</p>
                    <p className="text-lg text-cs-gray font-poppins">Login to track clicks and view insights.</p>
                </div>
                <Link href="/" className="bg-cs-green px-6 py-3 rounded-3xl font-poppins mt-4 text-lg hover:border-2 hover:border-cs-green hover:bg-cs-blue-light hover:text-cs-green focus:border-0 focus:outline-0">Get Started – It’s Free</Link>
                <input className="Search"></input>
            </div>
        </div>
    )
}