import { verifySession } from '@/app/lib/dal'
import Header from "@/component/header";

export default async function ProtectedLayout({children}: Readonly<{ children: React.ReactNode }>){
    await verifySession()

    return (
        <>
            <Header />
            {children}
        </>
    )
}
