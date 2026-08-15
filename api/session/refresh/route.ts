import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {createSession, refreshSession} from '@/lib/session'

/*
    Next.js creates this endpoint
    POST /api/session/refresh

    This api then calls the FastApi refresh endpoint: server-to-server request
*/

export async function POST() {
    const expired = await refreshSession();
    return NextResponse.json({
        refreshed: true,
        expiresIn: expired,
    })
    /*const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value

    if (!refreshToken) {
        return NextResponse.json(
            { refreshed: false },
            { status: 401 },
        )
    }

    // Call FastApi refresh endpoint
    const response = await fetch(
        `${process.env.FASTAPI_URL}/auth/refresh`,
        {
            method: 'POST',
            headers: {
                Cookie: `refresh_token=${refreshToken}`,
            },
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        cookieStore.delete('session')
        cookieStore.delete('refresh_token')

        return NextResponse.json(
            { refreshed: false },
            { status: 401 },
        )
    }

    const data = await response.json()

    await createSession({
        id: data.user.id,
        role: data.user.role,
        accessToken: data.access_token,
    })

    return NextResponse.json({
        refreshed: true,
        expiresIn: data.expires_in,
    })*/
}
