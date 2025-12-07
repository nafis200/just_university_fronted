import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

const publicRoutes = ["/login", "/contract","/notice"];

const roleBasedPrivateRoutes = {
  student: [/^\/student/, /^\/profile/, /^\/$/],
  admin: [/^\/admin/, /^\/$/],
  faculty: [/^\/faculty/, /^\/$/],
  dean: [/^\/dean/, /^\/$/],
  register: [/^\/register/, /^\/$/],
  hall_register: [/^\/hall_register/, /^\/$/],
};

const roleMap: Record<string, keyof typeof roleBasedPrivateRoutes> = {
  STUDENTS: "student",
  ADMIN: "admin",
  FACULTY: "faculty",
  DEAN: "dean",
  REGISTER: "register",
  HALL_REGISTER: "hall_register",
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const user = await getCurrentUser();

  if (!user) {
      return NextResponse.redirect(new URL("/notice", request.url));
  }

  const role = roleMap[user.role];

  if (role && roleBasedPrivateRoutes[role]) {
    const allowedRoutes = roleBasedPrivateRoutes[role];
    const isAllowed = allowedRoutes.some((route) => pathname.match(route));

    if (isAllowed) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/",
    "/profile",
    "/admin/:path*",
    "/faculty/:path*",
    "/dean/:path*",
    "/register/:path*",
    "/hall_register/:path*",
  ],
};
