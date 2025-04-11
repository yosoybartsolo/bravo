import Image from "next/image";
import Link from "next/link";
import connectDB from "@/libs/mongoose";
import Business from "@/models/Business";
import { notFound } from "next/navigation";
import ShareButton from "@/app/components/ShareButton";

// Metadata dinámica
export async function generateMetadata({ params }) {
	await connectDB();
	const business = await Business.findById(params.id).lean();

	if (!business) {
		return {
			title: "Negocio no encontrado | Sección Latina",
			description: "El negocio que buscas no existe o ha sido eliminado.",
		};
	}

	return {
		title: `${business.name} | Sección Latina`,
		description:
			business.description || `${business.name} - Negocio latino en Austin, TX`,
	};
}

const BusinessPage = async ({ params }) => {
	// Conectar a la base de datos
	await connectDB();

	// Buscar el negocio por ID
	let business;
	try {
		business = await Business.findById(params.id).lean();
	} catch (error) {
		console.error("Error al obtener el negocio:", error);
	}

	// Redirigir a 404 si no se encuentra el negocio
	if (!business) {
		notFound();
	}

	// Formato condicional del número de WhatsApp (eliminar caracteres no numéricos)
	const whatsappNumber = business.whatsapp?.replace(/\D/g, "");

	return (
		<div className="bg-amber-50">
			{/* Encabezado del negocio */}
			<div className="bg-gradient-to-r from-amber-600 to-yellow-500 pt-16 pb-8">
				<div className="container mx-auto px-4">
					<Link
						href="/"
						className="inline-flex items-center mb-6 text-white hover:text-amber-200 transition-colors">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor">
							<path
								fillRule="evenodd"
								d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
								clipRule="evenodd"
							/>
						</svg>
						Volver
					</Link>

					<div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
						{/* Logo del negocio */}
						<div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center relative">
							{business.logoUrl ? (
								<Image
									src={business.logoUrl}
									alt={`Logo de ${business.name}`}
									fill
									sizes="(max-width: 768px) 8rem, 10rem"
									className="object-contain p-2"
								/>
							) : (
								<div className="w-full h-full bg-amber-100 flex items-center justify-center text-amber-800 text-4xl font-bold">
									{business.name.charAt(0)}
								</div>
							)}
						</div>

						{/* Información principal */}
						<div className="text-center md:text-left">
							<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
								{business.name}
							</h1>
							<p className="text-amber-100 text-lg mb-4">{business.category}</p>

							{business.isApproved ? (
								<span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-1"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									Verificado
								</span>
							) : null}
						</div>
					</div>
				</div>
			</div>

			{/* Contenido principal */}
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Columna izquierda: Información de contacto */}
					<div className="md:col-span-2">
						<div className="bg-white rounded-xl shadow-md p-6 mb-8">
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Acerca de este negocio
							</h2>
							<p className="text-gray-700 mb-6 whitespace-pre-line">
								{business.description || "No hay descripción disponible."}
							</p>

							{business.address && (
								<div className="mb-4">
									<h3 className="font-semibold text-gray-800 mb-2">
										Dirección
									</h3>
									<p className="text-gray-600">{business.address}</p>

									{business.googleMapsUrl && (
										<a
											href={business.googleMapsUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center mt-2 text-amber-600 hover:text-amber-800">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5 mr-1"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
													clipRule="evenodd"
												/>
											</svg>
											Ver en Google Maps
										</a>
									)}
								</div>
							)}

							<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="bg-amber-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">Contacto</h3>
									<ul className="space-y-2">
										{business.email && (
											<li className="flex items-start">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-2 text-amber-500 mt-0.5"
													viewBox="0 0 20 20"
													fill="currentColor">
													<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
													<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
												</svg>
												<a
													href={`mailto:${business.email}`}
													className="text-amber-700 hover:text-amber-900 break-all">
													{business.email}
												</a>
											</li>
										)}

										{business.whatsapp && (
											<li className="flex items-start">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-2 text-amber-500 mt-0.5"
													viewBox="0 0 448 512">
													<path
														fill="currentColor"
														d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
													/>
												</svg>
												<a
													href={`https://wa.me/${whatsappNumber}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-amber-700 hover:text-amber-900">
													{business.whatsapp}
												</a>
											</li>
										)}
									</ul>
								</div>

								{/* Redes sociales */}
								<div className="bg-amber-50 p-4 rounded-lg">
									<h3 className="font-semibold text-gray-800 mb-2">
										Redes Sociales
									</h3>
									<div className="flex flex-wrap gap-3">
										{business.instagram && (
											<a
												href={`https://instagram.com/${business.instagram.replace(
													"@",
													""
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="bg-gradient-to-tr from-amber-500 to-pink-500 text-white p-2 rounded-lg flex items-center hover:opacity-90 transition-opacity">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-1"
													viewBox="0 0 448 512">
													<path
														fill="currentColor"
														d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
													/>
												</svg>
												Instagram
											</a>
										)}

										{business.facebook && (
											<a
												href={business.facebook}
												target="_blank"
												rel="noopener noreferrer"
												className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-1"
													viewBox="0 0 320 512">
													<path
														fill="currentColor"
														d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
													/>
												</svg>
												Facebook
											</a>
										)}

										{business.twitter && (
											<a
												href={`https://twitter.com/${business.twitter.replace(
													"@",
													""
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												className="bg-black text-white p-2 rounded-lg flex items-center hover:bg-gray-800 transition-colors">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5 mr-1"
													viewBox="0 0 24 24"
													fill="currentColor">
													<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
												</svg>
												X.com
											</a>
										)}

										{!business.instagram &&
											!business.facebook &&
											!business.twitter && (
												<p className="text-gray-500 text-sm italic">
													No hay redes sociales disponibles.
												</p>
											)}
									</div>
								</div>
							</div>
						</div>

						{/* Información adicional que podría agregarse en futuras versiones */}
						<div className="bg-white rounded-xl shadow-md p-6">
							<h2 className="text-2xl font-bold text-gray-800 mb-4">Galería</h2>
							<div className="bg-amber-50 rounded-lg p-8 text-center">
								<p className="text-amber-800">
									Próximamente: Imágenes y fotos del negocio
								</p>
							</div>
						</div>
					</div>

					{/* Columna derecha: Acciones */}
					<div>
						<div className="bg-white rounded-xl shadow-md p-6 mb-6">
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Contactar
							</h2>
							<div className="space-y-3">
								{business.whatsapp && (
									<a
										href={`https://wa.me/${whatsappNumber}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg transition-colors">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2"
											viewBox="0 0 448 512">
											<path
												fill="currentColor"
												d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
											/>
										</svg>
										Contactar por WhatsApp
									</a>
								)}

								{business.email && (
									<a
										href={`mailto:${business.email}`}
										className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg transition-colors">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5 mr-2"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
										Enviar Correo
									</a>
								)}
							</div>
						</div>

						<div className="bg-white rounded-xl shadow-md p-6">
							<h2 className="text-xl font-bold text-gray-800 mb-4">
								Compartir
							</h2>
							<div className="flex flex-wrap gap-2">
								<ShareButton
									title={business.name}
									description={
										business.description ||
										`Descubre ${business.name} en Sección Latina`
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessPage;
