import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

// Prevent caching
export const dynamic = "force-dynamic";

// GET /api/admin/users/[id]
export async function GET(req, { params }) {
  try {
    console.log("🔍 Fetching user...");
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }

    await connectMongo();
    console.log("📡 MongoDB connected");

    const user = await User.findById(id)
      .select("name email role createdAt lastLogin")
      .lean();

    if (!user) {
      console.log("❌ User not found:", id);
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    console.log("✅ User found:", user._id);
    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id]
export async function PUT(req, { params }) {
  try {
    console.log("📝 Updating user...");
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "ID de usuario requerido" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, role } = body;

    // Validaciones básicas
    if (!name) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Nombre es requerido" },
        { status: 400 }
      );
    }

    // Validar rol
    const validRoles = ["user", "admin", "editor", "moderator"];
    if (role && !validRoles.includes(role)) {
      console.log("❌ Invalid role:", role);
      return NextResponse.json({ error: "Rol no válido" }, { status: 400 });
    }

    await connectMongo();
    console.log("📡 MongoDB connected");

    const user = await User.findById(id);
    if (!user) {
      console.log("❌ User not found:", id);
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar usuario
    user.name = name;
    if (role) user.role = role;
    await user.save();

    console.log("✅ User updated successfully:", user._id);
    return NextResponse.json(user);
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}
