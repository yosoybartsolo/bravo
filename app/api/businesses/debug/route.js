import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";

// GET /api/businesses/debug - Obtener todos los negocios (para depuración)
export async function GET() {
	try {
		await connectDB();

		// Obtener todos los negocios
		const businesses = await Business.find().sort({
			createdAt: -1,
		});

		// Recopilar información de categorías
		const categoryCounts = {};
		businesses.forEach((business) => {
			const category = business.category;
			categoryCounts[category] = (categoryCounts[category] || 0) + 1;
		});

		return NextResponse.json({
			total: businesses.length,
			categoryCounts,
			businesses: businesses.map((b) => ({
				id: b._id,
				name: b.name,
				category: b.category,
				isApproved: b.isApproved,
			})),
		});
	} catch (error) {
		console.error("Error al obtener negocios para depuración:", error);
		return NextResponse.json(
			{ error: "Error al obtener negocios" },
			{ status: 500 }
		);
	}
}
