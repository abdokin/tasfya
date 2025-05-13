import { NextRequest, NextResponse } from 'next/server'
 
// Routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/bookmark']

// Routes that are always accessible without authentication
const publicRoutes = ['/login', '/signup', '/']

// Routes that are API endpoints
const apiRoutes = ['/api']
 
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Skip middleware for API routes, static assets, etc.
  if (apiRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get the token from cookies
  const token = req.cookies.get('auth_token')?.value

  // If no token and trying to access a protected route, redirect to login
  if (!token && isProtectedRoute) {
    const url = new URL('/login', req.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)', '/'],
}