// /src/app/api/admin/signup/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose'; // ✅ FIXED: named import
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'Admin created successfully',
        adminId: newAdmin._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
