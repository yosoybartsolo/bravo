import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";

// GET /api/businesses/[id] - Obtener un negocio específico
export async function GET(request, { params }) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const { id } = params;

		await connectDB();

		const business = await Business.findOne({
			_id: id,
			userId: session.user.id,
		});

		if (!business) {
			return NextResponse.json(
				{ error: "Negocio no encontrado" },
				{ status: 404 }
			);
		}

		return NextResponse.json(business);
	} catch (error) {
		console.error("Error al obtener negocio:", error);
		return NextResponse.json(
			{ error: "Error al obtener negocio" },
			{ status: 500 }
		);
	}
}

// PUT /api/businesses/[id] - Actualizar un negocio
export async function PUT(request, { params }) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const { id } = params;
		const data = await request.json();

		await connectDB();

		// Verificar que el negocio pertenece al usuario actual
		const business = await Business.findOne({
			_id: id,
			userId: session.user.id,
		});

		if (!business) {
			return NextResponse.json(
				{ error: "Negocio no encontrado" },
				{ status: 404 }
			);
		}

		// Actualizar el negocio
		const updatedBusiness = await Business.findByIdAndUpdate(
			id,
			{
				...data,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		);

		return NextResponse.json(updatedBusiness);
	} catch (error) {
		console.error("Error al actualizar negocio:", error);
		return NextResponse.json(
			{ error: "Error al actualizar negocio" },
			{ status: 500 }
		);
	}
}

// DELETE /api/businesses/[id] - Eliminar un negocio
export async function DELETE(request, { params }) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const { id } = params;

		await connectDB();

		// Verificar que el negocio pertenece al usuario actual
		const business = await Business.findOne({
			_id: id,
			userId: session.user.id,
		});

		if (!business) {
			return NextResponse.json(
				{ error: "Negocio no encontrado" },
				{ status: 404 }
			);
		}

		// Eliminar el negocio
		await Business.findByIdAndDelete(id);

		return NextResponse.json({ message: "Negocio eliminado correctamente" });
	} catch (error) {
		console.error("Error al eliminar negocio:", error);
		return NextResponse.json(
			{ error: "Error al eliminar negocio" },
			{ status: 500 }
		);
	}
}
