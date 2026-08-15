'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const REFRESH_INTERVAL = 10 * 60 * 1000 // 10 minutes

export default function SessionRefresher() {
    const router = useRouter()

    useEffect(() => {
        let refreshing = false

        async function refresh() {
            if (refreshing) return

            refreshing = true

            try {
                const response = await fetch('/api/session/refresh', {
                    method: 'POST',
                    credentials: 'same-origin',
                })

                if (response.status === 401) {
                    router.replace('/login')
                    router.refresh()
                }
            } finally {
                refreshing = false
            }
        }

        // void refresh()

        const interval = window.setInterval(refresh, REFRESH_INTERVAL)

        return () => {
            window.clearInterval(interval)
        }
    }, [router])

    return null
}
