// app/api/admin/signup/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { AdminModel } from "@/models/Admin";

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    await connectDB();

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await AdminModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "Admin created successfully ✅" });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
