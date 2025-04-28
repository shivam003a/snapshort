'use client'
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";

export default function GenerateQRCode({ shortId, title }) {
    const qrRef = useRef(null)

    const downloadQrCode = () => {
        const canvas = qrRef?.current?.querySelector('canvas')
        const urlToImage = canvas.toDataURL('image/png')

        const downloadLink = document.createElement('a')
        downloadLink.href = urlToImage
        downloadLink.download = title ? `${title}_${shortId}_qr_code.png` : `${shortId}_qr_code.png`

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    return (
        <div className="flex items-end gap-2">
            <div ref={qrRef}>
                <QRCodeCanvas
                    value={`${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`}
                    title={"ShortURL QR Code"}
                    size={128}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={'M'}
                />
            </div>
            <button onClick={downloadQrCode} className="cursor-pointer">
                <AiOutlineCloudDownload size={22} />
            </button>
        </div>
    )
}