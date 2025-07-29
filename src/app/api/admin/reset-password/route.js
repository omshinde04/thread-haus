import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    await admin.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
