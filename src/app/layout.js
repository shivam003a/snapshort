import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from '@/app/loading'
import { Toaster } from 'react-hot-toast';
import { Providers } from "@/redux/providers";

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700']
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Toaster position="top-right" reverseOrder={false} />
        <Suspense fallback={<Loading />}>
          <Providers>
            {children}
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
