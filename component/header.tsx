'use client'

import Link from "next/link";
import Image from 'next/image'
import {logout} from "@/actions/auth";

export default function Header() {
    return (
        <header className="bg-blue-900 p-4">
            <nav className="flex justify-center space-x-4">
                <Link href="/" className="flex items-center">
                    <Image src="/next.svg" alt="Next.js logo" width={100} height={20} priority />
                </Link>
                <Link href='/profile' className="font-medium ml-auto rounded-lg px-3 py-2 text-white hover:bg-gray-100 hover:text-gray-900">
                    Yiyan HU
                </Link>
                <button className="text-white" onClick={logout}>Logout</button>
            </nav>
        </header>
    )
}
