"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import categoriesData from "@/data/categories.json";

// Función para formatear número de WhatsApp
const formatWhatsAppLink = (number) => {
	// Eliminar cualquier carácter no numérico
	const cleaned = number.replace(/\D/g, "");
	return `https://wa.me/${cleaned}`;
};

export default function CategoryPage() {
	const params = useParams();
	const slug = params?.slug;

	console.log("Parámetros de ruta:", params);
	console.log("Slug de categoría:", slug);

	const [businesses, setBusinesses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [category, setCategory] = useState(null);

	useEffect(() => {
		if (!slug) {
			console.error("No se encontró el slug en la URL");
			setError("No se pudo determinar la categoría");
			setLoading(false);
			return;
		}

		// Encontrar la información de la categoría actual
		const currentCategory = categoriesData.find((cat) => cat.id === slug);
		console.log("Datos de categorías disponibles:", categoriesData);
		console.log("Categoría encontrada:", currentCategory);
		setCategory(currentCategory);

		// Obtener negocios de esta categoría
		const fetchBusinesses = async () => {
			try {
				setLoading(true);
				console.log(`Solicitando datos a: /api/businesses/category/${slug}`);

				const res = await fetch(`/api/businesses/category/${slug}`);

				if (!res.ok) {
					const errorData = await res.json().catch(() => ({}));
					console.error("Error en la respuesta:", res.status, errorData);
					throw new Error(
						`Error ${res.status}: ${
							errorData.error || "Error al cargar los negocios"
						}`
					);
				}

				const data = await res.json();
				console.log(
					`Se encontraron ${data.length} negocios para la categoría '${slug}':`
				);
				console.log(data);
				setBusinesses(data);
			} catch (err) {
				console.error("Error fetching businesses:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchBusinesses();
	}, [slug]);

	// Si está cargando, mostrar indicador
	if (loading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
			</div>
		);
	}

	// Si hay un error, mostrar mensaje
	if (error) {
		return (
			<div className="min-h-screen flex justify-center items-center flex-col">
				<h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
				<p className="text-gray-700">{error}</p>
				<Link
					href="/"
					className="mt-6 text-amber-600 hover:text-amber-700 font-medium">
					Volver al inicio
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-amber-50/50">
			{/* Header de categoría */}
			<div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-12 px-4">
				<div className="container mx-auto flex flex-col items-center">
					{category && (
						<>
							<div className="text-6xl mb-4 bg-white/20 w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm">
								{category.emoji}
							</div>
							<h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">
								{category.name}
							</h1>
						</>
					)}
					<p className="text-center max-w-2xl text-white/90">
						Descubre los mejores negocios latinos en Austin dentro de esta
						categoría
					</p>
				</div>
			</div>

			{/* Lista de negocios */}
			<div className="container mx-auto px-4 py-12">
				{businesses.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="text-2xl font-bold text-amber-600 mb-4">
							No hay negocios en esta categoría todavía
						</h2>
						<p className="text-gray-600 mb-6">
							Sé el primero en añadir tu negocio en esta categoría
						</p>
						<Link
							href="/dashboard"
							className="btn bg-amber-500 hover:bg-amber-600 text-white border-0">
							Añadir mi negocio
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{businesses.map((business) => (
							<div
								key={business._id}
								className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-amber-100 flex flex-col">
								{/* Cabecera de la tarjeta */}
								<div className="p-5 border-b border-amber-50 flex items-center space-x-4">
									{business.logoUrl ? (
										<div className="flex-shrink-0">
											<div className="w-16 h-16 rounded-full overflow-hidden relative border border-amber-200 shadow-sm">
												<Image
													src={business.logoUrl}
													alt={`Logo de ${business.name}`}
													fill
													className="object-cover"
												/>
											</div>
										</div>
									) : (
										<div className="flex-shrink-0">
											<div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 flex justify-center items-center shadow-sm">
												<span className="text-xl font-bold">
													{business.name.charAt(0).toUpperCase()}
												</span>
											</div>
										</div>
									)}
									<div className="min-w-0">
										<h2 className="text-lg font-semibold text-amber-600 truncate">
											{business.name}
										</h2>
										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
											{category?.name || "Negocio"}
										</span>
									</div>
								</div>

								{/* Descripción del negocio */}
								{business.description && (
									<div className="px-5 pt-4 pb-2">
										<p className="text-sm text-gray-600 line-clamp-3">
											{business.description}
										</p>
									</div>
								)}

								{/* Dirección del negocio */}
								{business.address && (
									<div className="px-5 pt-2 pb-3">
										<div className="flex items-start">
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
												<span className="text-sm text-gray-700 leading-tight">
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
									</div>
								)}

								{/* Contenido de la tarjeta - Opciones de contacto */}
								<div className="p-5 flex-grow">
									<h3 className="text-sm font-medium text-gray-500 mb-3">
										Contactar:
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
										<a
											href={formatWhatsAppLink(business.whatsapp)}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center justify-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 448 512"
												fill="currentColor"
												className="w-5 h-5 mr-2">
												<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
											</svg>
											WhatsApp
										</a>

										<a
											href={`mailto:${business.email}`}
											className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-300 shadow-sm">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												className="w-5 h-5 mr-2">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
												/>
											</svg>
											Email
										</a>
									</div>
								</div>

								{/* Pie de la tarjeta con redes sociales */}
								<div className="p-5 pt-0 flex justify-center space-x-4 border-t border-amber-50 mt-auto">
									{business.instagram && (
										<a
											href={business.instagram}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110 duration-300">
											<span className="sr-only">Instagram</span>
											<svg
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-6 w-6">
												<path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
											</svg>
										</a>
									)}
									{business.facebook && (
										<a
											href={business.facebook}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-blue-600 transition-colors transform hover:scale-110 duration-300">
											<span className="sr-only">Facebook</span>
											<svg
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-6 w-6">
												<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
											</svg>
										</a>
									)}
									{business.twitter && (
										<a
											href={business.twitter}
											target="_blank"
											rel="noopener noreferrer"
											className="text-gray-400 hover:text-black transition-colors transform hover:scale-110 duration-300">
											<span className="sr-only">X (Twitter)</span>
											<svg
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-6 w-6">
												<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
											</svg>
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
