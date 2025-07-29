import { connectDB } from "@/lib/mongoose";
import LatestArrival from "@/models/LatestProduct"; 
import { uploadImagesToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const description = formData.get("description")?.toString() || "";
    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice")) || 0;
    const stockStatus = formData.get("stockStatus")?.toString() || "In Stock";

    // ✅ Parse sizes array
    let sizes = [];
    try {
      const rawSizes = formData.get("sizes")?.toString() || "[]";
      sizes = JSON.parse(rawSizes);
      if (!Array.isArray(sizes)) sizes = [];
    } catch {
      sizes = [];
    }

    // ✅ Parse colors array
    let colors = [];
    try {
      const rawColors = formData.get("colors")?.toString() || "[]";
      colors = JSON.parse(rawColors);
      if (!Array.isArray(colors)) colors = [];
    } catch {
      colors = [];
    }

    // ✅ Basic validation
    if (!name || isNaN(price)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Image validation
    const imageFiles = formData.getAll("images").filter(Boolean);

    if (imageFiles.length > 5) {
      return NextResponse.json({ error: "Too many images (max 5)" }, { status: 413 });
    }

    for (const file of imageFiles) {
      if (!file || typeof file.arrayBuffer !== "function") {
        return NextResponse.json({ error: "Invalid file format" }, { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File size exceeds 5MB" }, { status: 413 });
      }
    }

    // ✅ Upload images to Cloudinary
    const imageUrls = imageFiles.length > 0 ? await uploadImagesToCloudinary(imageFiles) : [];

    // ✅ Save to DB
    const newProduct = await LatestArrival.create({
      name,
      description,
      price,
      originalPrice,
      stockStatus,
      colors,
      sizes,
      images: imageUrls,
    });

    return NextResponse.json(
      { message: "Latest Arrival Product successfully added", product: newProduct },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ POST /api/latest-arrival Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const allProducts = await LatestArrival.find().sort({ createdAt: -1 });

    return NextResponse.json(allProducts, { status: 200 });
  } catch (err) {
    console.error("❌ GET /api/latest-arrival Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
