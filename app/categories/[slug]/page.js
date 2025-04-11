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
								className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden border border-amber-100 transform hover:-translate-y-1 flex flex-col h-full">
								{/* Elemento decorativo de fondo */}
								<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-bl-full opacity-60 z-0"></div>

								{/* Contenido principal */}
								<div className="p-6 relative z-10">
									{/* Header con logo y nombre */}
									<div className="flex items-start gap-4 mb-5">
										{/* Logo con efecto de elevación */}
										<div className="relative flex-shrink-0">
											{business.logoUrl ? (
												<div className="w-20 h-20 rounded-xl overflow-hidden transform transition-transform group-hover:scale-105 duration-500 shadow-lg relative border-2 border-amber-300">
													<Image
														src={business.logoUrl}
														alt={`Logo de ${business.name}`}
														fill
														className="object-cover"
													/>
													<div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
												</div>
											) : (
												<div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-105 duration-500 border-2 border-amber-300">
													<span className="text-2xl font-bold text-white">
														{business.name.charAt(0).toUpperCase()}
													</span>
													<div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent"></div>
												</div>
											)}
										</div>

										{/* Información del negocio */}
										<div className="flex-1 min-w-0">
											<h2 className="text-xl font-bold text-amber-700 leading-tight mb-1 group-hover:text-amber-600 transition-colors">
												{business.name}
											</h2>
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
												{category?.name || "Negocio"}
											</span>
										</div>
									</div>

									{/* Descripción con efecto de tarjeta */}
									{business.description && (
										<div className="mb-5 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 p-4 rounded-xl border border-amber-100/50 backdrop-blur-sm transform transition-transform group-hover:scale-[1.02] duration-500">
											<p className="text-gray-700 text-sm leading-relaxed line-clamp-3 italic relative pl-3">
												<span className="absolute left-0 top-0 text-amber-400 text-xl">
													"
												</span>
												{business.description}
												<span className="absolute text-amber-400 text-xl">
													"
												</span>
											</p>
										</div>
									)}

									{/* Información de contacto con iconos mejorados */}
									<div className="grid grid-cols-1 gap-3 mb-5">
										<a
											href={formatWhatsAppLink(business.whatsapp)}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-200 transform hover:-translate-y-0.5 group/item">
											<div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-500 mr-3 group-hover/item:bg-green-100 transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 448 512"
													fill="currentColor"
													className="w-5 h-5">
													<path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
												</svg>
											</div>
											<div className="flex-1">
												<p className="text-xs text-gray-500 font-medium mb-0.5">
													WhatsApp
												</p>
												<p className="text-sm font-semibold text-gray-700 truncate group-hover/item:text-green-700 transition-colors">
													{business.whatsapp}
												</p>
											</div>
										</a>

										{business.address && (
											<div className="flex items-start px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-red-200 transform hover:-translate-y-0.5 group/item">
												<div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-red-500 mr-3 mt-1 group-hover/item:bg-red-100 transition-colors">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor">
														<path
															fillRule="evenodd"
															d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div className="flex-1">
													<p className="text-xs text-gray-500 font-medium mb-0.5">
														Dirección
													</p>
													<p className="text-sm font-semibold text-gray-700 leading-tight group-hover/item:text-red-700 transition-colors">
														{business.address}
													</p>
													{business.googleMapsUrl && (
														<a
															href={business.googleMapsUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="inline-flex items-center text-xs text-blue-500 hover:text-blue-700 mt-1 transition-colors">
															<span>Ver en Google Maps</span>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-3 w-3 ml-1"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
																/>
															</svg>
														</a>
													)}
												</div>
											</div>
										)}
										<a
											href={`mailto:${business.email}`}
											className="flex items-center px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-200 transform hover:-translate-y-0.5 group/item">
											<div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-50 text-amber-500 mr-3 group-hover/item:bg-amber-100 transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor">
													<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
													<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
												</svg>
											</div>
											<div className="flex-1">
												<p className="text-xs text-gray-500 font-medium mb-0.5">
													Email
												</p>
												<p className="text-sm font-semibold text-gray-700 truncate group-hover/item:text-amber-700 transition-colors">
													{business.email}
												</p>
											</div>
										</a>
									</div>
								</div>

								{/* Pie de tarjeta - Redes sociales */}
								{(business.instagram ||
									business.facebook ||
									business.twitter) && (
									<div className="flex justify-center space-x-3 px-6 pb-6 mt-auto">
										{business.instagram && (
											<a
												href={business.instagram}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md transform transition-transform hover:scale-110">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
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
												className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md transform transition-transform hover:scale-110">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
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
												className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-md transform transition-transform hover:scale-110">
												<svg
													viewBox="0 0 24 24"
													fill="currentColor"
													width="18"
													height="18"
													className="fill-current">
													<path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
												</svg>
											</a>
										)}
									</div>
								)}
								{/* Botón Ver más */}
								<Link
									href={`/business/${business._id}`}
									className="mt-4 inline-flex items-center justify-center px-4 py-2 bg-amber-500 text-white rounded-d-lg hover:bg-amber-600 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
									<span>Ver más</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
