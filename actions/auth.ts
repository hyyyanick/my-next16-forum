'use server'

import { SignupFormSchema, FormState } from '@/lib/definitions'
import {createSession, deleteSession} from "@/lib/session";
import {redirect} from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
    console.log('signup action called with state:', state, 'and formData:', formData)
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for calling FastApi external http
    const { name, email, password } = validatedFields.data

    // 3. Get the User info and create user session here
    const user = { name, email }
    await createSession(user);

    redirect('/');
}

export async function logout() {
    await deleteSession();
    redirect('/login');
}
