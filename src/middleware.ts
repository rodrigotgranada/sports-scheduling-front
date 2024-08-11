import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Redirecionar a raiz para /home
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/home', request.url));
  }

  // Obter o token JWT para verificação de autenticação
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Define as rotas protegidas
  const protectedPaths = ['/dashboard', '/admin', '/user'];

  if (protectedPaths.includes(request.nextUrl.pathname)) {
    if (!token) {
      // Se não estiver autenticado, redirecione para a página de login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/admin/:path*', '/user/:path*'],
};
