import FAQs from "@/components/Faqs";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>SnapShort | Smarter Link Shortening</title>
				<meta title="description" content="Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable." />

				<meta property="og:title" content="SnapShort | Smarter Link Shortening" />
				<meta property="og:description" content="Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable." />
				<meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/assets/landing_og.png" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="SnapShort | Smarter Link Shortening" />
				<meta name="twitter:description" content="Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable." />
				<meta name="twitter:image" content="/assets/landing_og.png" />
			</Head>
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
