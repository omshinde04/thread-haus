import { connectToDatabase } from "@/lib/mongoose";

export async function GET() {
  try {
    await connectToDatabase();
    return new Response(JSON.stringify({ message: "✅ MongoDB Connected Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return new Response(JSON.stringify({ message: "❌ MongoDB Connection Failed", error }), {
      status: 500,
    });
  }
}
