import { connectDB } from "@/lib/mongoose";
import GenreProduct from "@/models/GenreProduct";
import { uploadImagesToCloudinary } from "@/utils/cloudinary";

export async function POST(req) {
  try {
    await connectDB();

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return new Response("Content-Type must be multipart/form-data", { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const genre = formData.get("genre")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice"));
    const stockStatus = formData.get("stockStatus")?.toString() || "In Stock";

    // ✅ Parse sizes array
    let rawSizes = formData.get("sizes")?.toString() || "[]";
    let sizes;
    try {
      sizes = JSON.parse(rawSizes);
      if (!Array.isArray(sizes)) sizes = [sizes];
    } catch {
      sizes = [rawSizes];
    }

    // ✅ Parse colors array
    let rawColors = formData.get("colors")?.toString() || "[]";
    let colors;
    try {
      colors = JSON.parse(rawColors);
      if (!Array.isArray(colors)) colors = [colors];
    } catch {
      colors = [rawColors];
    }

    // ✅ Basic validation
    if (!name || !genre || isNaN(price)) {
      return new Response("Missing required fields", { status: 400 });
    }

    // ✅ Image validation
    const imageFiles = formData.getAll("images");
    if (imageFiles.length > 5) {
      return new Response("Too many images (max 5)", { status: 413 });
    }

    for (const file of imageFiles) {
      if (!(file instanceof File)) {
        return new Response("Invalid file format", { status: 400 });
      }
      if (file.size > 5 * 1024 * 1024) {
        return new Response("File size exceeds 5MB", { status: 413 });
      }
    }

    // ✅ Upload images
    const imageUrls = await uploadImagesToCloudinary(imageFiles);

    // ✅ Save to DB
    const newProduct = await GenreProduct.create({
      name,
      genre,
      description,
      price,
      originalPrice,
      stockStatus,
      colors,
      sizes,
      images: imageUrls,
    });

    // ✅ Final success response
    return new Response(
      JSON.stringify({
        message: "Product successfully added",
        product: newProduct,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("❌ POST /api/genre-products Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();

    const allProducts = await GenreProduct.find().sort({ createdAt: -1 });

    const grouped = allProducts.reduce((acc, prod) => {
      if (!acc[prod.genre]) acc[prod.genre] = [];
      acc[prod.genre].push(prod);
      return acc;
    }, {});

    return new Response(JSON.stringify(grouped), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("❌ GET /api/genre-products Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
