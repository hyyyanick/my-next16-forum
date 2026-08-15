import { verifySession } from '@/lib/dal'
import Header from "@/component/header";
import SessionRefresher from "@/component/session-refresher";
import {Suspense} from "react";

async function AuthenticatedContent({children}: Readonly<{ children: React.ReactNode }>){
    await verifySession()
    return (
        <>
            <SessionRefresher />
            <Header />
            {children}
        </>
    )
}

export default function ProtectedLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthenticatedContent>
                {children}
            </AuthenticatedContent>
        </Suspense>
    )
}
