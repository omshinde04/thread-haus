import { connectDB } from "@/lib/mongoose";
import GenreProduct from "@/models/GenreProduct";
import { uploadImagesToCloudinary } from "@/utils/cloudinary";

// ✅ GET: Fetch product details
export async function GET(req, context) {
  try {
    await connectDB();
    const params = await context.params; // ✅ Correct per Next.js dynamic API docs
    const id = params.id;


    const product = await GenreProduct.findById(id);
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/genre-products/[id] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}



//put 
export async function PUT(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ Correct per Next.js dynamic API docs
    const id = params.id;

    const product = await GenreProduct.findById(id);
    if (!product) return new Response("Product not found", { status: 404 });

    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const genre = formData.get("genre")?.toString();
    const description = formData.get("description")?.toString();
    const price = Number(formData.get("price"));
    const originalPrice = Number(formData.get("originalPrice"));
    const stockStatus = formData.get("stockStatus")?.toString();
    const sizes = JSON.parse(formData.get("sizes") || "[]");
    const colors = JSON.parse(formData.get("colors") || "[]");

    const imageFiles = formData.getAll("images");
    const uploadedUrls = imageFiles.length
      ? await uploadImagesToCloudinary(imageFiles.filter(f => f && f.name))
      : [];

    let updatedImages = [...(product.images || [])];
    let uploadIndex = 0;
    for (let i = 0; i < 4; i++) {
      const file = imageFiles[i];
      if (file && file.name) {
        updatedImages[i] = uploadedUrls[uploadIndex];
        uploadIndex++;
      }
    }

    const updated = await GenreProduct.findByIdAndUpdate(
      id,
      {
        name,
        genre,
        description,
        price,
        originalPrice,
        stockStatus,
        colors,
        sizes,
        images: updatedImages,
      },
      { new: true }
    );

    return new Response(
      JSON.stringify({
        message: "Product updated successfully",
        product: updated,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("PUT /api/genre-products/[id] Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}



export async function DELETE(req, context) {
  await connectDB();

  try {
    const params = await context.params; // ✅ Awaited correctly
    const removed = await GenreProduct.findByIdAndDelete(params.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete product" }),
      { status: 500 }
    );
  }
}

