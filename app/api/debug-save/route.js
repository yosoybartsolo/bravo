import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

// POST /api/debug-save - Guardar descripción manualmente
export async function POST(request) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const data = await request.json();
		const { businessId, description } = data;

		console.log("Datos recibidos para actualización manual:", {
			businessId,
			description,
			descriptionType: typeof description,
			descriptionLength: description ? description.length : 0,
		});

		if (!businessId) {
			return NextResponse.json(
				{ error: "ID de negocio requerido" },
				{ status: 400 }
			);
		}

		await connectDB();

		// Verificar que el negocio existe y pertenece al usuario
		const business = await Business.findOne({
			_id: businessId,
			userId: session.user.id,
		});

		if (!business) {
			return NextResponse.json(
				{ error: "Negocio no encontrado" },
				{ status: 404 }
			);
		}

		console.log(
			"Negocio encontrado, descripción actual:",
			business.description || "Sin descripción"
		);

		// Actualizar solo el campo de descripción directamente
		const result = await Business.updateOne(
			{ _id: businessId },
			{
				$set: {
					description: description,
					updatedAt: new Date(),
				},
			}
		);

		console.log("Resultado de la actualización:", result);

		// Obtener el negocio actualizado para verificar
		const updatedBusiness = await Business.findById(businessId);

		console.log(
			"Descripción después de actualizar:",
			updatedBusiness.description || "Sin descripción"
		);

		return NextResponse.json({
			success: true,
			descriptionSaved: updatedBusiness.description || "",
			updateResult: result,
		});
	} catch (error) {
		console.error("Error en debug-save:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
