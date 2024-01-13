import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async(request: NextRequest) => {

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl;

    //If user has logged in and pathname = '/login', redirect to home page
    if(token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
        if(pathname === '/login') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    //If user hasn't logged in and current url is not equal to '/login', redirect user to login page
    if(!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}