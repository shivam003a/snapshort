import { features } from "@/helpers/data"
import FeatureCard from "../FeatureCard"

export default function Features() {
    return (
        <div className="w-full max-w-[1200px] mx-auto flex justify-center items-stretch gap-4 px-2 py-16">
            <div className="flex-1/4 flex flex-col gap-6">
                <div className="font-poppins text-cs-green text-4xl font-bold">Features</div>
                <span className="font-poopins text-lg text-cs-gray">Everything you need to manage, track, and share your links with confidence.</span>
            </div>
            <div className="border-r-1 border-cs-blue-light"></div>
            <div className="flex-3/4 flex flex-row gap-12 px-8 relative">
                {
                    features && features?.length > 0 && features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))
                }
                <div className="bg-cs-blue-dark h-14 w-full absolute -bottom-13"></div>
            </div>
        </div>
    )
}