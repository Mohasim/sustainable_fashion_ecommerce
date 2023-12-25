import { NextRequest } from 'next/server';

import { auth } from '@/helpers/server/auth';

export { jwtMiddleware };

async function jwtMiddleware(req: NextRequest) {
    if (isPublicPath(req))
        return;

    // verify token in request cookie
    const id = auth.verifyToken();
    req.headers.set('userId', id);
}

function isPublicPath(req: NextRequest) {
    // public routes that don't require authentication
    const publicPaths = [
        `POST:${process.env.PUBLIC_NEXT_BASE_API_URL}/api/account/login`,
        `POST:${process.env.PUBLIC_NEXT_BASE_API_URL}/api/account/logout`,
        `POST:${process.env.PUBLIC_NEXT_BASE_API_URL}/api/account/register`
    ];
    return publicPaths.includes(`${req.method}:${req.nextUrl.pathname}`);
}