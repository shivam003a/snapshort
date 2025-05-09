import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from '@/app/loading'
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/redux/providers";
import { Analytics } from "@vercel/analytics/react"

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata = {
  title: "SnapShort | Smarter Link Shortening",
  description: "Shorten URLs with ease and track analytics in real-time. Secure, fast, and fully customizable.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Toaster position="bottom-right" reverseOrder={false} />
        <Suspense fallback={<Loading />}>
          <Providers>
            {children}
          </Providers>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
