import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "El nombre del negocio es obligatorio"],
		trim: true,
		maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
	},
	userId: {
		type: String,
		required: [true, "El ID del usuario es obligatorio"],
		index: true,
	},
	whatsapp: {
		type: String,
		required: [true, "El número de WhatsApp es obligatorio"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "El email es obligatorio"],
		trim: true,
		lowercase: true,
		match: [/^\S+@\S+\.\S+$/, "Por favor ingrese un email válido"],
	},
	category: {
		type: String,
		required: [true, "La categoría es obligatoria"],
		trim: true,
	},
	instagram: {
		type: String,
		trim: true,
		default: "",
	},
	facebook: {
		type: String,
		trim: true,
		default: "",
	},
	twitter: {
		type: String,
		trim: true,
		default: "",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	isApproved: {
		type: Boolean,
		default: false,
	},
});

// Evitar definir el modelo múltiples veces durante hot reloading en desarrollo
const Business =
	mongoose.models.Business || mongoose.model("Business", BusinessSchema);

export default Business;
