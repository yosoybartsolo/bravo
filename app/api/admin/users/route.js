import { NextResponse } from "next/server";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";
// Force dynamic to avoid caching
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectMongo();
    const users = await User.find({})
      .select("name email createdAt updatedAt lastLogin role")
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
