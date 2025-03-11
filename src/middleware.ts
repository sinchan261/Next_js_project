import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/home', request.url))
const path=request.nextUrl.pathname
const is_public=path==='/loginv'||path==='/signupv'
const token=request.cookies.get('token')?.value||''
if(is_public&&token){
    return NextResponse.redirect(new URL('/',request.nextUrl.origin))
}
if(!is_public&&!token){
  return NextResponse.redirect(new URL('/login',request.nextUrl.origin))
}
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    "/kl"
    // '/',
    // '/profile',
    // '/login',
    // '/signup'
  ]
}