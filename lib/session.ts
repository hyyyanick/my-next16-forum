import 'server-only'
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const sessionExpiration = 15 * 60 * 1000; // 15 mins in milliseconds

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload;
    } catch (error) {
        console.log('Failed to verify session');
    }
}

export async function createSession(user: any) {
    const expiresAt = new Date(Date.now() + sessionExpiration);
    const session = await encrypt({ user, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function refreshSession() {
    const currentToken = (await cookies()).get('session')?.value;
    const payload = await decrypt(currentToken);

    if (!currentToken || !payload) {
        return null;
    }

    const expiresAt = new Date(Date.now() + sessionExpiration);

    // Create a new JWT with a new `exp`
    const refreshedToken = await encrypt({
        user: payload.user,
        expiresAt,
    })

    const cookieStore = await cookies();
    cookieStore.set('session', refreshedToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    return expiresAt;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
