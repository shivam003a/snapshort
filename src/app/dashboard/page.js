export const metadata = {
    title: "Dashboard — Manage Your Links | SnapShort",
    description: "Access your custom dashboard to manage, track, and analyze all your shortened URLs with SnapShort.",
    openGraph: {
        title: "Dashboard — Manage Your Links | SnapShort",
        description: "Access your dashboard to manage and analyze your SnapShort links in one place.",
        url: "https://snapshort.vercel.app/dashboard",
        type: "website",
        images: [
            {
                url: "/assets/dashboard_og.png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Dashboard — Manage Your Links | SnapShort",
        description: "Access your dashboard to manage and analyze your SnapShort links in one place.",
        images: ["/assets/dashboard_og.png"],
    },
};

import Dashboard from "./layout";

export default function DashboardPage() {
    return (
        <Dashboard />
    )
}