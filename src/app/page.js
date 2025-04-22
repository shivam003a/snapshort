import FAQs from "@/components/Faqs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

export const metadata = {
	title: "SnapShort | Smarter Link Shortening",
	description: "Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable.",
	openGraph: {
		title: "SnapShort | Smarter Link Shortening",
		description: "Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable.",
		url: "https://snapshort.vercel.app",
		type: "website",
		images: [
			{
				url: "/assets/landing_og.png",
				alt: "SnapShort Landing Preview",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "SnapShort | Smarter Link Shortening",
		description: "Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable.",
		images: ["/assets/landing_og.png"],
	},
};

export default function Home() {
	return (
		<>
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
		</>
	)
}
