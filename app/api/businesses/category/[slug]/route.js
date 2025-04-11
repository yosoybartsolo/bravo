import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";

// GET /api/businesses/category/[slug] - Obtener negocios por categoría
export async function GET(request, { params }) {
	try {
		const { slug } = params;

		if (!slug) {
			return NextResponse.json(
				{ error: "Categoría no especificada" },
				{ status: 400 }
			);
		}

		await connectDB();

		// Buscar TODOS los negocios por categoría, incluyendo los no aprobados (para pruebas)
		const businesses = await Business.find({
			category: slug,
		}).sort({
			createdAt: -1,
		});

		console.log(
			`Encontrados ${businesses.length} negocios en la categoría ${slug}`
		);

		return NextResponse.json(businesses);
	} catch (error) {
		console.error("Error al obtener negocios por categoría:", error);
		return NextResponse.json(
			{ error: "Error al obtener negocios por categoría" },
			{ status: 500 }
		);
	}
}
