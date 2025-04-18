import FAQs from "@/components/Faqs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export default function Home() {
	return (
		<div className="">
			<div className="bg-linear-to-t from-cs-blue-light to-cs-blue-dark">
				<Hero />
			</div>
			<div className="bg-cs-blue-dark">
				<Features />
			</div>
			<div className="bg-cs-blue-light">
				<FAQs />
			</div>
			<div className="bg-cs-blue-dark">
				<Footer />
			</div>
		</div>
	)
}
