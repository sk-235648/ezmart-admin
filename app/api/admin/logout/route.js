// app/api/admin/logout/route.js
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Remove the cookie
  res.cookies.set("admin-auth", "", {
    httpOnly: true,
    expires: new Date(0), // expire now
    path: "/",
  });

  return res;
}
