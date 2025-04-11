import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth";

// Tamaño máximo permitido: 4MB
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB en bytes

// Configure Cloudinary directly in this file as a backup
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Check if credentials are defined
console.log("API Route Cloudinary Config:", {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "defined" : "undefined",
	api_key: process.env.CLOUDINARY_API_KEY ? "defined" : "undefined",
	api_secret: process.env.CLOUDINARY_API_SECRET ? "defined" : "undefined",
});

// Direct upload function
const directUploadToCloudinary = (buffer) => {
	return new Promise((resolve, reject) => {
		const uploadOptions = {
			folder: "seccionlatina/business-logos",
			resource_type: "image",
			transformation: [
				{ width: 500, height: 500, crop: "limit" },
				{ quality: "auto:good" },
			],
		};

		console.log("Starting direct Cloudinary upload");

		cloudinary.uploader
			.upload_stream(uploadOptions, (error, result) => {
				if (error) {
					console.error("Cloudinary direct upload error:", error);
					return reject(error);
				}
				console.log("Cloudinary direct upload successful");
				resolve(result);
			})
			.end(buffer);
	});
};

export async function POST(request) {
	try {
		// Verificar autenticación
		const session = await getServerSession(authOptions);
		if (!session?.user) {
			console.log("Upload failed: User not authenticated");
			return NextResponse.json({ error: "No autorizado" }, { status: 401 });
		}

		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			console.log("Upload failed: No file provided");
			return NextResponse.json(
				{ error: "No se ha proporcionado ningún archivo" },
				{ status: 400 }
			);
		}

		// Verificar que el archivo es una imagen
		if (!file.type.startsWith("image/")) {
			console.log(`Upload failed: Invalid file type: ${file.type}`);
			return NextResponse.json(
				{ error: "El archivo debe ser una imagen" },
				{ status: 400 }
			);
		}

		// Verificar el tamaño del archivo
		if (file.size > MAX_FILE_SIZE) {
			console.log(`Upload failed: File too large: ${file.size} bytes`);
			return NextResponse.json(
				{
					error: "El tamaño del archivo no debe exceder 4MB",
					maxSize: MAX_FILE_SIZE,
					actualSize: file.size,
				},
				{ status: 400 }
			);
		}

		console.log("Processing upload: File validation passed");

		// Convertir el archivo a buffer
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		console.log("File converted to buffer, size:", buffer.length, "bytes");

		try {
			// Try to use direct upload instead of the importable function
			const result = await directUploadToCloudinary(buffer);

			console.log("Upload successful, returning result");
			return NextResponse.json(
				{
					url: result.secure_url,
					public_id: result.public_id,
				},
				{ status: 200 }
			);
		} catch (cloudinaryError) {
			console.error("Cloudinary upload failed:", cloudinaryError);
			return NextResponse.json(
				{
					error: "Error al subir la imagen a Cloudinary",
					details:
						process.env.NODE_ENV === "development"
							? cloudinaryError.message
							: undefined,
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		// Registrar detalles completos del error
		console.error("Error al procesar la imagen:", error);
		console.error("Error stack:", error.stack);

		// Si tiene detalles adicionales, registrarlos
		if (error.message) console.error("Error message:", error.message);

		return NextResponse.json(
			{
				error: "Error al procesar la imagen",
				details:
					process.env.NODE_ENV === "development" ? error.message : undefined,
			},
			{ status: 500 }
		);
	}
}
