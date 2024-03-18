import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import i18n from '../i18n';
import { i18n } from './i18.config';
// i18.config
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';


// get local automatically from request
function getLocale(request: any) {
  const negotiatorHeaders: any = {};
  request.headers.forEach((value: any, key: any) => {
    return (negotiatorHeaders[key] = value)
  });
  const locales = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = match(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: any) {
  // get the path
    const path = request.nextUrl.pathname; 
    // get the language abreviation from path
    const mainLocal = path.split("/"); 
    // check if path does not start with /${locale} => /en or /fr
    // And check if path is different from /${locale} => /en or /fr
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !path.startsWith(`/${locale}`) && path !== `/${locale}`
    ); 


    // if en or fr missing
    if (pathnameIsMissingLocale) {
      // get en or fr from request body using above declared function
        const locale = getLocale(request);
        return NextResponse.redirect(
          new URL(
            `/${locale}${path.startsWith('/') ? '' : '/'}${path}`,
            request.nextUrl
          )
        );
    }

    // else check if path is public path as done below
    const isPublicPath = 
            path === `/en/` || 
            path === `/en/login` ||
            path === `/fr/` || 
            path === `/fr/login`
    const token = request.cookies.get("token")?.value || ""; 

    // We do not acces public pages when already login
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL(`/${mainLocal[1]}/`, request.nextUrl)); 
    } 

    // We should not have access to private pages when not login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL(`/${mainLocal[1]}/login`, request.nextUrl)); 
    }

}

// export function middleware(request: NextRequest) {
//   // const locale = request.nextUrl.locale || i18n.defaultLocale;
//   // request.nextUrl.searchParams.set('lang', locale);
//   // request.nextUrl.href = request.nextUrl.href.replace(`/${locale}`, '');
//   // return NextResponse.rewrite(request.nextUrl);

//   // else check if path is public path as done below
//   const path = request.nextUrl.pathname; 
//   const isPublicPath = 
//     // path === `/en/` || 
//     // path === `/en/login` ||
//     // path === `/fr/` || 
//     // path === `/fr/login`
//     path === `/login`
//   const token = request.cookies.get("token")?.value || ""; 

//   // console.log("0000000000", token)

//   // if (!request?.cookies.get('session')) {}

//   // We do not acces public pages when already login
//   if (isPublicPath && token) {
//     return NextResponse.redirect(new URL(`/`, request.nextUrl)); 
//   } 

//   // We should not have access to private pages when not login
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL(`/login`, request.nextUrl)); 
//   }
// }

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/', 
    '/login', 
    '/dashboard', 
    '/decaissement', 
    '/confirmDecaissement', 
    '/users', 
    '/settings', 
    '/((?!api|_next/static|_next/image|favicon.ico).*)', 
  ],
};
