'use client'

import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
    const [state, action, pending] = useActionState(signup, undefined)

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image className="mx-auto h-10 w-auto" src="/next.svg" alt="Next.js Logo" width={100} height={20}/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your
                    account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action={action} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                        <div className="mt-2">
                            <input id="name" type="text" name="name" required autoComplete="name"
                                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                        {state?.errors?.name ? <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p> : null}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email
                            address</label>
                        <div className="mt-2">
                            <input id="email" type="email" name="email" required autoComplete="email"
                                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                        {state?.errors?.email ? <p className="text-red-500 text-sm mt-1">{state.errors.email[0]}</p> : null}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm/6 font-medium text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                    password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" type="password" name="password" required
                                   autoComplete="current-password"
                                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                        </div>
                        {state?.errors?.password ? <p className="text-red-500 text-sm mt-1">{state.errors.password[0]}</p> : null}
                    </div>

                    <div>
                        <button type="submit" disabled={pending} className="flex w-full justify-center rounded-md bg-indigo-600
                        px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
