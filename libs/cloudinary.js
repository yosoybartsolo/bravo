import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary con las credenciales
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Log Cloudinary configuration status
console.log("Cloudinary config status:", {
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Not set",
	api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Not set",
	api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Not set",
});

// Función para subir una imagen a Cloudinary
export const uploadImage = async (imageBuffer) => {
	return new Promise((resolve, reject) => {
		// Subir la imagen como un buffer
		const uploadOptions = {
			folder: "seccionlatina/business-logos",
			resource_type: "image",
			transformation: [
				{ width: 500, height: 500, crop: "limit" }, // Limitar el tamaño máximo
				{ quality: "auto:good" }, // Optimizar calidad automáticamente
			],
		};

		console.log("Starting Cloudinary upload with options:", uploadOptions);

		cloudinary.uploader
			.upload_stream(uploadOptions, (error, result) => {
				if (error) {
					console.error("Cloudinary upload error details:", error);
					return reject(error);
				}
				console.log("Cloudinary upload successful");
				resolve(result);
			})
			.end(imageBuffer);
	});
};

export default cloudinary;
