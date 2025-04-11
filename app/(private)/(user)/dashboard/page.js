"use client";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

// Categorías de negocios disponibles
const BUSINESS_CATEGORIES = [
	{ id: "restaurants", name: "Restaurantes" },
	{ id: "services", name: "Servicios" },
	{ id: "professionals", name: "Profesionales" },
	{ id: "events", name: "Eventos" },
	{ id: "retail", name: "Tiendas" },
	{ id: "beauty", name: "Belleza y Estética" },
	{ id: "healthcare", name: "Salud" },
	{ id: "other", name: "Otros" },
];

// URLs base para redes sociales
const SOCIAL_BASE_URLS = {
	instagram: "https://instagram.com/",
	facebook: "https://facebook.com/",
	twitter: "https://twitter.com/",
};

// Componente para mostrar un negocio individual con opción para editar
const BusinessCard = ({ business, onEdit, onDelete }) => {
	return (
		<div className="card bg-white shadow-md border border-yellow-100 hover:shadow-lg transition-all">
			<div className="card-body">
				<div className="flex justify-between items-start">
					<div className="flex items-center gap-3">
						{business.logoUrl ? (
							<div className="avatar">
								<div className="w-14 h-14 rounded-full overflow-hidden relative border border-yellow-200 flex-shrink-0">
									<Image
										src={business.logoUrl}
										alt={`Logo de ${business.name}`}
										fill
										className="object-cover"
									/>
								</div>
							</div>
						) : (
							<div className="avatar placeholder">
								<div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex justify-center items-center flex-shrink-0">
									<span className="text-lg font-bold">
										{business.name.charAt(0)}
									</span>
								</div>
							</div>
						)}
						<h2 className="card-title text-amber-600">{business.name}</h2>
					</div>
					<span className="badge bg-yellow-100 text-amber-600 border-yellow-200">
						{BUSINESS_CATEGORIES.find((cat) => cat.id === business.category)
							?.name || "Categoría"}
					</span>
				</div>

				{business.description && (
					<p className="text-gray-600 mt-2 text-sm line-clamp-2">
						{business.description}
					</p>
				)}

				<div className="grid grid-cols-1 gap-3 mt-4">
					<div className="flex items-center text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2 text-green-500"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="text-sm truncate">{business.email}</span>
					</div>
					<div className="flex items-center text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2 text-green-500"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
						</svg>
						<span className="text-sm truncate">{business.whatsapp}</span>
					</div>

					{business.address && (
						<div className="flex items-start text-gray-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 mr-2 text-red-500 flex-shrink-0 mt-0.5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
							<div className="flex flex-col">
								<span className="text-sm leading-tight">
									{business.address}
								</span>
								{business.googleMapsUrl && (
									<a
										href={business.googleMapsUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs text-blue-500 hover:text-blue-700 hover:underline mt-1">
										Ver en Google Maps
									</a>
								)}
							</div>
						</div>
					)}
				</div>

				<div className="flex mt-4 space-x-3">
					{business.instagram && (
						<a
							href={business.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="text-pink-500 hover:text-pink-600">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					)}
					{business.facebook && (
						<a
							href={business.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:text-blue-700">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current">
								<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
							</svg>
						</a>
					)}
					{business.twitter && (
						<a
							href={business.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="text-black hover:text-gray-700">
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								width="24"
								height="24"
								className="fill-current">
								<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
							</svg>
						</a>
					)}
				</div>

				<div className="card-actions justify-end mt-4 space-x-2">
					<button
						onClick={() => onEdit(business)}
						className="btn btn-sm bg-amber-100 hover:bg-amber-200 text-amber-700 border border-amber-200">
						Editar Negocio
					</button>
					<button
						onClick={() => onDelete(business._id)}
						className="btn btn-sm bg-red-100 hover:bg-red-200 text-red-700 border border-red-200">
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};

// Función para extraer el nombre de usuario de una URL completa de red social
const extractUsername = (url, platform) => {
	if (!url) return "";

	const baseUrl = SOCIAL_BASE_URLS[platform];
	if (url.startsWith(baseUrl)) {
		return url.substring(baseUrl.length);
	}

	// Si la URL no tiene el formato esperado, devolver como está
	return url;
};

// Componente de carga de imágenes
const LogoUploader = ({ logo, setLogo, existingLogo }) => {
	const [isUploading, setIsUploading] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(existingLogo || null);
	const fileInputRef = useRef(null);

	// Tamaño máximo: 4MB en bytes
	const MAX_FILE_SIZE = 4 * 1024 * 1024;

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		// Validar tipo de archivo
		if (!file.type.startsWith("image/")) {
			toast.error("El archivo debe ser una imagen (JPG, PNG, GIF)");
			return;
		}

		// Validar tamaño del archivo
		if (file.size > MAX_FILE_SIZE) {
			toast.error("El tamaño de la imagen no debe exceder 4MB");
			return;
		}

		// Crear preview
		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			setPreviewUrl(e.target.result);
		};
		fileReader.readAsDataURL(file);

		setIsUploading(true);

		// Crear FormData para enviar el archivo
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Error al subir la imagen");
			}

			const result = await response.json();
			setLogo({
				url: result.url,
				publicId: result.public_id,
			});
			toast.success("Logo subido correctamente");
		} catch (error) {
			console.error("Error al subir logo:", error);
			toast.error(error.message || "Error al subir la imagen");
			setPreviewUrl(existingLogo);
		} finally {
			setIsUploading(false);
		}
	};

	const handleRemoveLogo = () => {
		setPreviewUrl(null);
		setLogo(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="form-control">
			<label className="label">
				<span className="label-text text-gray-700">Logo del Negocio</span>
			</label>
			<div className="flex flex-col items-center">
				{previewUrl ? (
					<div className="relative mb-4">
						<div className="w-32 h-32 rounded-full overflow-hidden relative border-2 border-yellow-200">
							<Image
								src={previewUrl}
								alt="Vista previa del logo"
								fill
								className="object-cover"
							/>
						</div>
						<button
							type="button"
							onClick={handleRemoveLogo}
							className="btn btn-circle btn-xs absolute -top-1 -right-1 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				) : (
					<div className="w-32 h-32 rounded-full bg-yellow-50 border-2 border-dashed border-yellow-200 flex items-center justify-center mb-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-12 w-12 text-yellow-300"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				)}
				<div className="flex items-center justify-center w-full">
					<label
						className={`btn ${
							isUploading ? "loading" : ""
						} bg-yellow-100 hover:bg-yellow-200 text-amber-700 border border-yellow-200`}>
						{isUploading
							? "Subiendo..."
							: previewUrl
							? "Cambiar Logo"
							: "Subir Logo"}
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							accept="image/*"
							onChange={handleFileChange}
							disabled={isUploading}
						/>
					</label>
				</div>
				<p className="text-xs text-gray-500 mt-2">
					JPG, PNG o GIF. Máximo 4MB.
				</p>
			</div>
		</div>
	);
};

// Formulario para crear o editar un negocio
const BusinessForm = ({ business, onSave, onCancel }) => {
	// Procesar datos iniciales para extraer usernames de redes sociales si es un negocio existente
	const initialData = business
		? {
				...business,
				description: business.description || "",
				instagram_username: extractUsername(business.instagram, "instagram"),
				facebook_username: extractUsername(business.facebook, "facebook"),
				twitter_username: extractUsername(business.twitter, "twitter"),
		  }
		: {
				name: "",
				description: "",
				address: "",
				googleMapsUrl: "",
				whatsapp: "",
				email: "",
				instagram_username: "",
				facebook_username: "",
				twitter_username: "",
				category: "",
		  };

	// Log para depuración: verificar qué datos iniciales recibe el formulario
	console.log("Datos iniciales del formulario:", {
		isEditing: !!business,
		description: initialData.description || "No hay descripción",
		businessId: business?._id || "nuevo negocio",
	});

	const [formData, setFormData] = useState(initialData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [logo, setLogo] = useState(
		business?.logoUrl
			? {
					url: business.logoUrl,
					publicId: business.cloudinaryPublicId,
			  }
			: null
	);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// Log para campos importantes
		if (name === "description") {
			console.log(`Actualizando campo ${name} con valor:`, value);
			console.log("Tipo de valor:", typeof value);
		}

		setFormData((prev) => {
			const updated = {
				...prev,
				[name]: value,
			};

			// Log para verificar la actualización del estado
			if (name === "description") {
				console.log("Valor actualizado en formData:", updated.description);
			}

			return updated;
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// Verificar que la descripción se esté capturando correctamente
			console.log("Descripción antes de preparar datos:", formData.description);

			// Construir URLs completas para redes sociales
			const dataToSubmit = {
				name: formData.name,
				// Asegurarse de que la descripción se incluya correctamente, incluso si está vacía
				description:
					typeof formData.description === "string" ? formData.description : "",
				address: formData.address || "",
				googleMapsUrl: formData.googleMapsUrl || "",
				whatsapp: formData.whatsapp,
				email: formData.email,
				category: formData.category,
				instagram: formData.instagram_username
					? `${SOCIAL_BASE_URLS.instagram}${formData.instagram_username}`
					: "",
				facebook: formData.facebook_username
					? `${SOCIAL_BASE_URLS.facebook}${formData.facebook_username}`
					: "",
				twitter: formData.twitter_username
					? `${SOCIAL_BASE_URLS.twitter}${formData.twitter_username}`
					: "",
			};

			// Añadir logo si existe
			if (logo) {
				dataToSubmit.logoUrl = logo.url;
				dataToSubmit.cloudinaryPublicId = logo.publicId;
			} else {
				dataToSubmit.logoUrl = "";
				dataToSubmit.cloudinaryPublicId = "";
			}

			// Si es una edición, incluir el ID
			if (business?._id) {
				dataToSubmit._id = business._id;
			}

			console.log("Datos a enviar a la API:", {
				type: business ? "update" : "create",
				description: dataToSubmit.description,
				descriptionType: typeof dataToSubmit.description,
				descriptionLength: dataToSubmit.description
					? dataToSubmit.description.length
					: 0,
				businessId: business?._id || "nuevo negocio",
			});

			// Usar la función onSave heredada del componente padre
			// en lugar de intentar actualizar directamente el estado de businesses
			await onSave(dataToSubmit);

			// El manejo de la respuesta y actualización del estado
			// se realizará en el componente padre que tiene acceso a setBusinesses

			toast.success(
				business
					? "Negocio actualizado correctamente"
					: "Negocio creado correctamente"
			);
		} catch (error) {
			console.error("Error al guardar negocio:", error);
			toast.error(error.message || "Error al guardar el negocio");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="card bg-white shadow-xl border border-yellow-100">
			<div className="card-body">
				<h2 className="card-title text-amber-600 mb-4">
					{business ? "Editar Negocio" : "Agregar Nuevo Negocio"}
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text text-gray-700">
								Nombre del Negocio *
							</span>
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
							required
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text text-gray-700">Descripción</span>
						</label>
						<textarea
							name="description"
							value={formData.description || ""}
							onChange={handleChange}
							onBlur={(e) =>
								console.log("Valor al salir del campo:", e.target.value)
							}
							className="textarea textarea-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 h-24"
							maxLength="500"
							placeholder="Describe brevemente tu negocio (máximo 500 caracteres)"></textarea>
						<div className="text-xs text-right text-gray-500 mt-1">
							{formData.description?.length || 0}/500
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text text-gray-700">Dirección</span>
						</label>
						<input
							type="text"
							name="address"
							value={formData.address || ""}
							onChange={handleChange}
							className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
							placeholder="Dirección física del negocio"
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text text-gray-700">
								URL de Google Maps
							</span>
						</label>
						<input
							type="url"
							name="googleMapsUrl"
							value={formData.googleMapsUrl || ""}
							onChange={handleChange}
							className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
							placeholder="https://maps.google.com/..."
						/>
						<div className="text-xs text-gray-500 mt-1">
							Pega aquí el enlace completo que obtienes al compartir la
							ubicación desde Google Maps
						</div>
					</div>

					{/* Componente de carga de logo */}
					<LogoUploader
						logo={logo}
						setLogo={setLogo}
						existingLogo={business?.logoUrl}
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-gray-700">WhatsApp *</span>
							</label>
							<input
								type="tel"
								name="whatsapp"
								value={formData.whatsapp}
								onChange={handleChange}
								className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
								placeholder="+52 123 456 7890"
								required
							/>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text text-gray-700">Email *</span>
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="input input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
								required
							/>
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text text-gray-700">Categoría *</span>
						</label>
						<select
							name="category"
							value={formData.category}
							onChange={handleChange}
							className="select select-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50"
							required>
							<option value="" disabled>
								Selecciona una categoría
							</option>
							{BUSINESS_CATEGORIES.map((category) => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</div>

					<h3 className="text-lg font-medium text-gray-700 mt-2">
						Redes Sociales
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text text-gray-700">Instagram</span>
							</label>
							<div className="join w-full">
								<div className="join-item bg-gray-100 px-3 flex items-center border border-r-0 border-yellow-200 rounded-l-md text-gray-500">
									{SOCIAL_BASE_URLS.instagram}
								</div>
								<input
									type="text"
									name="instagram_username"
									value={formData.instagram_username}
									onChange={handleChange}
									className="input join-item flex-1 input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-l-none"
									placeholder="username"
								/>
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text text-gray-700">Facebook</span>
							</label>
							<div className="join w-full">
								<div className="join-item bg-gray-100 px-3 flex items-center border border-r-0 border-yellow-200 rounded-l-md text-gray-500">
									{SOCIAL_BASE_URLS.facebook}
								</div>
								<input
									type="text"
									name="facebook_username"
									value={formData.facebook_username}
									onChange={handleChange}
									className="input join-item flex-1 input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-l-none"
									placeholder="username"
								/>
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text text-gray-700">Twitter/X</span>
							</label>
							<div className="join w-full">
								<div className="join-item bg-gray-100 px-3 flex items-center border border-r-0 border-yellow-200 rounded-l-md text-gray-500">
									{SOCIAL_BASE_URLS.twitter}
								</div>
								<input
									type="text"
									name="twitter_username"
									value={formData.twitter_username}
									onChange={handleChange}
									className="input join-item flex-1 input-bordered border-yellow-200 focus:border-amber-400 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded-l-none"
									placeholder="username"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end space-x-2 pt-4">
						<button
							type="button"
							onClick={onCancel}
							className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-700"
							disabled={isSubmitting}>
							Cancelar
						</button>
						<button
							type="submit"
							className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md"
							disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<span className="loading loading-spinner loading-sm"></span>
									{business ? "Guardando..." : "Creando..."}
								</>
							) : business ? (
								"Guardar Cambios"
							) : (
								"Crear Negocio"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default function Dashboard() {
	const { data: session } = useSession();
	const [businesses, setBusinesses] = useState([]);
	const [editingBusiness, setEditingBusiness] = useState(null);
	const [isCreating, setIsCreating] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Cargar negocios desde la API
	const fetchBusinesses = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/businesses");

			if (!response.ok) {
				throw new Error("Error al cargar los negocios");
			}

			const data = await response.json();
			setBusinesses(data);
		} catch (error) {
			console.error("Error fetching businesses:", error);
			setError(
				"No se pudieron cargar los negocios. Intente de nuevo más tarde."
			);
			toast.error("Error al cargar los negocios");
		} finally {
			setIsLoading(false);
		}
	};

	// Cargar datos al iniciar el componente
	useEffect(() => {
		if (session?.user) {
			fetchBusinesses();
		}
	}, [session]);

	const handleCreateBusiness = () => {
		setIsCreating(true);
		setEditingBusiness(null);
	};

	const handleEditBusiness = (business) => {
		setEditingBusiness(business);
		setIsCreating(false);
	};

	const handleCancelForm = () => {
		setIsCreating(false);
		setEditingBusiness(null);
	};

	// Guardar un nuevo negocio o actualizar uno existente
	const handleSaveBusiness = async (businessData) => {
		try {
			if (editingBusiness) {
				// Actualizar negocio existente
				console.log("Actualizando negocio con datos:", {
					id: editingBusiness._id,
					description: businessData.description,
				});

				const response = await fetch(`/api/businesses/${editingBusiness._id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(businessData),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "Error al actualizar el negocio");
				}

				// Actualizar el estado local
				const updatedBusiness = await response.json();
				console.log("Negocio actualizado:", {
					id: updatedBusiness._id,
					description: updatedBusiness.description || "No presente",
				});

				setBusinesses(
					businesses.map((b) =>
						b._id === updatedBusiness._id ? updatedBusiness : b
					)
				);
			} else {
				// Crear nuevo negocio
				console.log("Creando negocio con datos:", {
					description: businessData.description,
				});

				const response = await fetch("/api/businesses", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(businessData),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "Error al crear el negocio");
				}

				// Actualizar el estado local
				const newBusiness = await response.json();
				console.log("Negocio creado:", {
					id: newBusiness._id,
					description: newBusiness.description || "No presente",
				});

				setBusinesses([...businesses, newBusiness]);
			}

			setIsCreating(false);
			setEditingBusiness(null);

			// Refrescar la lista de negocios para asegurarnos de tener datos actualizados
			fetchBusinesses();
		} catch (error) {
			console.error("Error en handleSaveBusiness:", error);
			throw error; // Propagar el error para que el componente hijo pueda manejarlo
		}
	};

	// Eliminar un negocio
	const handleDeleteBusiness = async (businessId) => {
		if (
			!confirm(
				"¿Estás seguro de que deseas eliminar este negocio? Esta acción no se puede deshacer."
			)
		) {
			return;
		}

		try {
			const response = await fetch(`/api/businesses/${businessId}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Error al eliminar el negocio");
			}

			// Actualizar el estado local
			setBusinesses(businesses.filter((b) => b._id !== businessId));
			toast.success("Negocio eliminado correctamente");
		} catch (error) {
			console.error("Error deleting business:", error);
			toast.error("Error al eliminar el negocio");
		}
	};

	// Muestra el formulario de creación/edición o la lista de negocios
	const renderContent = () => {
		if (isCreating || editingBusiness) {
			return (
				<BusinessForm
					business={editingBusiness}
					onSave={handleSaveBusiness}
					onCancel={handleCancelForm}
				/>
			);
		}

		if (error) {
			return (
				<div className="card bg-white shadow-xl border border-red-100">
					<div className="card-body text-center">
						<h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
						<p className="text-gray-600 mb-6">{error}</p>
						<div className="flex justify-center">
							<button
								onClick={fetchBusinesses}
								className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md">
								Intentar de nuevo
							</button>
						</div>
					</div>
				</div>
			);
		}

		if (businesses.length === 0) {
			return (
				<div className="card bg-white shadow-xl border border-yellow-100">
					<div className="card-body text-center">
						<h2 className="text-2xl font-bold text-gray-700 mb-4">
							No tienes negocios registrados
						</h2>
						<p className="text-gray-600 mb-6">
							¡Comienza a promocionar tu negocio en nuestro directorio de
							emprendedores latinos!
						</p>
						<div className="flex justify-center">
							<button
								onClick={handleCreateBusiness}
								className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-2"
									viewBox="0 0 20 20"
									fill="currentColor">
									<path
										fillRule="evenodd"
										d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
										clipRule="evenodd"
									/>
								</svg>
								Agregar Negocio
							</button>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-bold text-gray-700">Mis Negocios</h2>
					<button
						onClick={handleCreateBusiness}
						className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
								clipRule="evenodd"
							/>
						</svg>
						Agregar Otro Negocio
					</button>
				</div>

				<div className="grid grid-cols-1 gap-4">
					{businesses.map((business) => (
						<BusinessCard
							key={business._id}
							business={business}
							onEdit={handleEditBusiness}
							onDelete={handleDeleteBusiness}
						/>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen p-8 bg-gradient-to-br from-yellow-50 to-white">
			<div className="max-w-4xl mx-auto space-y-8">
				{/* Encabezado */}
				<div className="card bg-white shadow-md border border-yellow-100">
					<div className="card-body">
						<h1 className="text-3xl font-bold text-amber-600">
							¡Bienvenido a tu Dashboard!
						</h1>
						<p className="text-gray-600">
							Aquí puedes gestionar tus negocios en nuestro directorio de
							emprendedores latinos.
						</p>
					</div>
				</div>

				{/* Contenido principal */}
				{isLoading ? (
					<div className="flex justify-center items-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
					</div>
				) : (
					renderContent()
				)}
			</div>
		</div>
	);
}
