import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";

export async function GET() {
	try {
		await connectDB();

		// Obtener un conteo rápido
		const count = await Business.countDocuments();

		// Obtener una muestra de los negocios
		const businesses = await Business.find()
			.limit(10)
			.select("name category address isApproved");

		return NextResponse.json(
			{
				count,
				message: `Hay ${count} negocios en la base de datos`,
				sample: businesses,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("[DEBUG] Error:", error);
		return NextResponse.json(
			{ error: "Error al obtener datos de diagnóstico" },
			{ status: 500 }
		);
	}
}
