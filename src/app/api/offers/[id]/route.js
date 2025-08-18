import { connectDB } from "@/lib/mongoose";
import Offer from "@/models/Offer";

// ✅ DELETE: Delete an offer by ID
export async function DELETE(req) {
  try {
    await connectDB();

    // Get the last segment of the pathname (the ID)
    const segments = req.nextUrl.pathname.split("/");
    const id = segments[segments.length - 1];

    const deletedOffer = await Offer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return new Response(
        JSON.stringify({ success: false, error: "Offer not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: deletedOffer }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("❌ DELETE /api/offers/[id] Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete offer" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
