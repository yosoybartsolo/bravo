import { NextResponse } from "next/server";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";
import mongoose from "mongoose";

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q");

		if (!query) {
			return NextResponse.json({ businesses: [] }, { status: 200 });
		}

		console.log(`[SEARCH] Iniciando búsqueda para: "${query}"`);

		// Conectar a MongoDB usando el método del proyecto
		await connectDB();

		// DIAGNÓSTICO: Verificar si hay negocios en la base de datos
		const totalBusinesses = await Business.countDocuments();
		console.log(
			`[SEARCH-DIAG] Total de negocios en la base de datos: ${totalBusinesses}`
		);

		// Si no hay negocios, intentar verificar la conexión a la base de datos
		if (totalBusinesses === 0) {
			const dbState = mongoose.connection.readyState;
			const dbStateMap = {
				0: "desconectado",
				1: "conectado",
				2: "conectando",
				3: "desconectando",
			};
			console.log(
				`[SEARCH-DIAG] Estado de la conexión a MongoDB: ${
					dbStateMap[dbState] || dbState
				}`
			);

			// Verificar la colección de negocios
			const collections = await mongoose.connection.db
				.listCollections()
				.toArray();
			console.log(
				"[SEARCH-DIAG] Colecciones en la base de datos:",
				collections.map((c) => c.name)
			);
		}

		// Crear una expresión regular para búsqueda insensible a mayúsculas/minúsculas
		const searchRegex = new RegExp(query, "i");

		// PRIMERO: Buscar sin restricción de isApproved para diagnóstico
		const allBusinesses = await Business.find({
			$or: [
				{ name: { $regex: searchRegex } },
				{ description: { $regex: searchRegex } },
				{ category: { $regex: searchRegex } },
				{ address: { $regex: searchRegex } },
			],
		}).limit(20);

		console.log(
			`[SEARCH-DIAG] Encontrados SIN filtro de aprobación: ${allBusinesses.length}`
		);

		// Buscar con el filtro normal de isApproved
		const businesses = await Business.find({
			$or: [
				{ name: { $regex: searchRegex } },
				{ description: { $regex: searchRegex } },
				{ category: { $regex: searchRegex } },
				{ address: { $regex: searchRegex } },
			],
			isApproved: true,
		}).limit(20);

		// Log detallado para debugging
		console.log(
			`[SEARCH] Encontrados CON filtro de aprobación: ${businesses.length} resultados para "${query}"`
		);

		// Retornar los resultados según diagnóstico
		// Si no hay resultados con isApproved:true pero sí hay sin el filtro, usar esos temporalmente
		const resultsToReturn = businesses.length > 0 ? businesses : allBusinesses;

		if (resultsToReturn.length > 0) {
			console.log(
				"[SEARCH] Primeros 3 resultados:",
				resultsToReturn.slice(0, 3).map((b) => ({
					id: b._id,
					name: b.name,
					category: b.category,
					address: b.address,
					isApproved: b.isApproved,
				}))
			);
		}

		return NextResponse.json({ businesses: resultsToReturn }, { status: 200 });
	} catch (error) {
		console.error("[SEARCH] Error:", error);
		return NextResponse.json(
			{ error: "Error al realizar la búsqueda" },
			{ status: 500 }
		);
	}
}
