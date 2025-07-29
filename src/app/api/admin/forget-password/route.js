import { NextResponse } from "next/server";
import  {connectDB } from "@/lib/mongoose";
import User from "@/models/Admin"; // Adjust path to your User model

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Email not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Email exists. Proceed to reset." }, { status: 200 });
  } catch (error) {
    console.error("Forget Password Error:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
