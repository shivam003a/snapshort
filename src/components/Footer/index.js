import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import Link from 'next/link'

function Footer() {
    return (
        <footer className='max-w-[1200px] mx-auto flex flex-col items-center justify-center py-8'>
            <p className='font-poppins text-sm text-cs-white'>&copy; {new Date()?.getFullYear()} <span className='text-cs-green text-md'>snap</span><span className='text-md'>/short</span>. All rights reserved.</p>
            <div className='flex mt-4 gap-5'>
                <Link href="https://instagram.com/shivam003a" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={22} color='#E1306C' />
                </Link>
                <Link href="https://x.com/shivam003a" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={22} color='#1DA1F2' />
                </Link>
                <Link href="https://linkedin.com/in/shivam003a" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={22} color='#1da1f2' />
                </Link>
                <Link href="https://github.com/shivam003a" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={22} color='#ffffff' />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;