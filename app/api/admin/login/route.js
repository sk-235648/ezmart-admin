import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { AdminModel } from "@/models/Admin";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectDB();

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Admin not found" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // ✅ Set proper cookie
    const response = NextResponse.json({ success: true, message: "Login successful" });
    response.cookies.set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only secure in production
      path: "/admin", // must be root so all routes receive it
    });

    return response;

  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
