import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

// GET /api/debug - Endpoint para depuración
export async function GET() {
	try {
		// Verificar autenticación para seguridad
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		await connectDB();

		// Obtener todos los negocios del usuario
		const businesses = await Business.find({ userId: session.user.id });

		// Crear un mapa de campos presentes/ausentes
		const fieldsInfo = businesses.map((business) => {
			const businessObj = business.toObject();
			return {
				id: businessObj._id.toString(),
				name: businessObj.name,
				hasDescription: !!businessObj.description,
				descriptionLength: businessObj.description
					? businessObj.description.length
					: 0,
				description: businessObj.description || "No hay descripción",
				hasAddress: !!businessObj.address,
				hasGoogleMapsUrl: !!businessObj.googleMapsUrl,
				isApproved: businessObj.isApproved,
				allFields: Object.keys(businessObj).filter(
					(key) => !["_id", "__v"].includes(key)
				),
			};
		});

		return NextResponse.json({
			count: businesses.length,
			businesses: fieldsInfo,
		});
	} catch (error) {
		console.error("Error en el endpoint de depuración:", error);
		return NextResponse.json(
			{ error: "Error al obtener datos de depuración" },
			{ status: 500 }
		);
	}
}
