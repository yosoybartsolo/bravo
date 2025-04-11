import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";

// GET /api/businesses - Obtener todos los negocios del usuario actual
export async function GET() {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		await connectDB();

		const businesses = await Business.find({ userId: session.user.id }).sort({
			createdAt: -1,
		});

		return NextResponse.json(businesses);
	} catch (error) {
		console.error("Error al obtener negocios:", error);
		return NextResponse.json(
			{ error: "Error al obtener negocios" },
			{ status: 500 }
		);
	}
}

// POST /api/businesses - Crear un nuevo negocio
export async function POST(request) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const data = await request.json();

		await connectDB();

		const newBusiness = new Business({
			...data,
			userId: session.user.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		await newBusiness.save();

		return NextResponse.json(newBusiness, { status: 201 });
	} catch (error) {
		console.error("Error al crear negocio:", error);
		return NextResponse.json(
			{ error: "Error al crear negocio" },
			{ status: 500 }
		);
	}
}
