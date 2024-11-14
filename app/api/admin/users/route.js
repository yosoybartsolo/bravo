import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({})
      .select("name email createdAt updatedAt lastLogin role")
      .sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
