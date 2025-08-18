import { connectDB } from "@/lib/mongoose";
import Offer from "@/models/Offer";

// ✅ GET: Fetch all offers
export async function GET(req) {
  try {
    await connectDB();
    const offers = await Offer.find().sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        success: true,
        message: offers.length ? "Offers fetched successfully" : "No offers found",
        data: offers,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ GET /api/offers Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch offers" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ POST: Add a new offer
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, description, discount, validFrom, validTo, text, icon } = body;

    if (!title || !discount || !validFrom || !validTo || !text) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newOffer = await Offer.create({
      title,
      description: description || "",
      discount: Number(discount),
      validFrom: new Date(validFrom),
      validTo: new Date(validTo),
      text,
      icon: icon || "gift",
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Offer added successfully",
        data: newOffer,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ POST /api/offers Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
