import Image from "next/image"

const rotateArray = ['-rotate-z-9', "rotate-z-0", "rotate-z-9"]

export default function FeatureCard({ feature, index }) {
    return (
        <div className={`w-2/3 mx-auto sm:w-full bg-cs-white flex-1 p-1 rounded-xl ${rotateArray[index]} translate-y-8 hover:translate-y-0 hover:rotate-z-0 transition-all duration-300 ease-in-out`}>
            <div className="rounded-xl">
                <Image src={feature?.image} width={400} height={200} alt="feature 1" className="rounded-xl"></Image>
            </div>
            <div className="flex flex-col gap-2 px-2 py-4">
                <span className="text-2xl font-poppins text-cs-blue-dark font-bold">{feature?.title}</span>
                <p className="font-poppins text-cs-gray font-normal text-sm">{feature?.description}</p>
            </div>
        </div>
    )
}