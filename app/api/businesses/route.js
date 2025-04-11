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

		// Logs para depuración
		console.log("[POST /api/businesses] Datos recibidos para crear negocio:", {
			hasSentDescription: "description" in data,
			description: data.description,
			descriptionType: typeof data.description,
			descriptionLength: data.description ? data.description.length : 0,
			allFields: Object.keys(data),
		});

		await connectDB();

		// Asegurarse de que la descripción esté presente
		const businessData = {
			...data,
			description: data.description !== undefined ? data.description : "",
			userId: session.user.id,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		console.log("[POST /api/businesses] Datos preparados para guardar:", {
			description: businessData.description,
			descriptionType: typeof businessData.description,
		});

		const newBusiness = new Business(businessData);

		// Verificar que los campos están presentes en el objeto
		console.log(
			"[POST /api/businesses] Campos del nuevo negocio antes de guardar:",
			{
				name: newBusiness.name,
				description: newBusiness.description || "No presente",
				address: newBusiness.address || "No presente",
				email: newBusiness.email,
				modelHasDescriptionField: "description" in newBusiness,
			}
		);

		await newBusiness.save();

		console.log("[POST /api/businesses] Negocio guardado en MongoDB:", {
			id: newBusiness._id,
			description: newBusiness.description || "No guardado",
			allSavedFields: Object.keys(newBusiness.toObject()),
		});

		return NextResponse.json(newBusiness, { status: 201 });
	} catch (error) {
		console.error("Error al crear negocio:", error);
		return NextResponse.json(
			{ error: "Error al crear negocio" },
			{ status: 500 }
		);
	}
}
