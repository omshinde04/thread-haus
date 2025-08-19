import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { password } = body;

    // ✅ Get admin password from .env
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { message: "Admin password not configured" },
        { status: 500 }
      );
    }

    // ✅ Check password
    if (password !== adminPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Generate JWT token with 30min expiry
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET, // add in .env
      { expiresIn: "30m" }
    );

    // ✅ Send token in response
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
