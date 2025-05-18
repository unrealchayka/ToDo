// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const accessToken = request.cookies.get('access_token')?.value;

//   if (!accessToken && !request.nextUrl.pathname.startsWith('/login')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }