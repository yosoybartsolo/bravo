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

		// Logs para depuración
		console.log(
			`[PUT /api/businesses/${id}] Datos recibidos para actualización:`,
			{
				hasSentDescription: "description" in data,
				description: data.description,
				descriptionType: typeof data.description,
				descriptionLength: data.description ? data.description.length : 0,
				address: data.address,
				googleMapsUrl: data.googleMapsUrl,
				allFields: Object.keys(data),
			}
		);

		// Conexión a la base de datos
		await connectDB();

		// Verificar que el negocio pertenece al usuario actual
		const businessExist = await Business.findOne({
			_id: id,
			userId: session.user.id,
		});

		if (!businessExist) {
			return NextResponse.json(
				{ error: "Negocio no encontrado" },
				{ status: 404 }
			);
		}

		// Preparar los datos para actualización
		const updateData = {
			...data,
			// Asegurar que estos campos sean strings, incluso si están vacíos
			description: typeof data.description === "string" ? data.description : "",
			address: typeof data.address === "string" ? data.address : "",
			googleMapsUrl:
				typeof data.googleMapsUrl === "string" ? data.googleMapsUrl : "",
			updatedAt: new Date(),
		};

		// Log de verificación
		console.log("Datos preparados para actualización:", {
			description: updateData.description,
			address: updateData.address,
			googleMapsUrl: updateData.googleMapsUrl,
		});

		// SOLUCIÓN RADICAL: Usar directamente el driver nativo de MongoDB
		const mongoose = await import("mongoose");

		// Acceder a la colección directamente
		const db = mongoose.connection.db;
		const collection = db.collection("businesses");

		// Convertir el ObjectId de string a ObjectId
		const objectId = new mongoose.Types.ObjectId(id);

		// Actualizar directamente usando la colección
		const result = await collection.updateOne(
			{ _id: objectId },
			{
				$set: {
					name: updateData.name,
					description: updateData.description,
					address: updateData.address,
					googleMapsUrl: updateData.googleMapsUrl,
					whatsapp: updateData.whatsapp,
					email: updateData.email,
					category: updateData.category,
					instagram: updateData.instagram,
					facebook: updateData.facebook,
					twitter: updateData.twitter,
					logoUrl: updateData.logoUrl,
					cloudinaryPublicId: updateData.cloudinaryPublicId,
					updatedAt: updateData.updatedAt,
				},
			}
		);

		console.log("Resultado de la actualización directa:", {
			matchedCount: result.matchedCount,
			modifiedCount: result.modifiedCount,
			upsertedCount: result.upsertedCount,
		});

		// Verificar si se modificó el documento
		if (result.matchedCount === 0) {
			return NextResponse.json(
				{ error: "No se encontró el negocio para actualizar" },
				{ status: 404 }
			);
		}

		// Cargar el negocio actualizado para verificar y devolver
		const updatedBusiness = await Business.findById(id);

		// Verificación final
		console.log(
			`[PUT /api/businesses/${id}] Resultado después de actualizar:`,
			{
				hasDescription: !!updatedBusiness.description,
				savedDescription: updatedBusiness.description || "[vacío]",
				savedAddress: updatedBusiness.address || "[vacío]",
				savedGoogleMapsUrl: updatedBusiness.googleMapsUrl || "[vacío]",
			}
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
