import mongoose from "mongoose";
// import User from "@/models/User";

// Variable para rastrear el estado de la conexión
let isConnected = false;

const connectDB = async () => {
	// Si ya estamos conectados, no hacer nada
	if (isConnected) {
		console.log("MongoDB ya está conectado");
		return;
	}

	try {
		const MONGODB_URI = process.env.MONGODB_URI;

		if (!MONGODB_URI) {
			throw new Error(
				"Por favor defina la variable de entorno MONGODB_URI en .env.local"
			);
		}

		// Opciones de conexión
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		// Conectar a MongoDB
		const conn = await mongoose.connect(MONGODB_URI, options);

		isConnected = !!conn.connection.readyState;

		console.log(`MongoDB conectado: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error al conectar a MongoDB: ${error.message}`);
		throw error;
	}
};

export default connectDB;
