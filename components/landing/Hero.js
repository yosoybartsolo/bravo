"use client";
import config from "@/config";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState(null);
	const [hasSearched, setHasSearched] = useState(false);
	const [diagnosticInfo, setDiagnosticInfo] = useState(null);
	const [showDiagnostic, setShowDiagnostic] = useState(false);

	// Limpiar resultados cuando se cambia la consulta
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setSearchResults([]);
			setHasSearched(false);
		}
	}, [searchQuery]);

	const handleSearch = async (e) => {
		e.preventDefault();
		const query = searchQuery.trim();
		if (!query) return;

		setIsSearching(true);
		setError(null);
		setHasSearched(true);

		try {
			console.log("[UI] Iniciando búsqueda para:", query);
			const response = await fetch(
				`/api/search?q=${encodeURIComponent(query)}`
			);

			if (!response.ok) {
				throw new Error(`Error en la búsqueda: ${response.status}`);
			}

			const data = await response.json();
			console.log("[UI] Resultados recibidos:", data);

			if (!data.businesses) {
				console.error("[UI] Datos de respuesta inválidos:", data);
				throw new Error("Formato de respuesta inválido");
			}

			setSearchResults(data.businesses);
			console.log("[UI] Total resultados:", data.businesses.length);
		} catch (error) {
			console.error("[UI] Error en la búsqueda:", error);
			setError(
				"Hubo un error al realizar la búsqueda. Por favor, intenta de nuevo."
			);
			setSearchResults([]);
		} finally {
			setIsSearching(false);
		}
	};

	// Función para obtener información de diagnóstico
	const fetchDiagnosticInfo = async () => {
		try {
			const response = await fetch("/api/debug-businesses");
			if (!response.ok) {
				throw new Error(`Error al obtener diagnóstico: ${response.status}`);
			}
			const data = await response.json();
			setDiagnosticInfo(data);
			setShowDiagnostic(true);
		} catch (error) {
			console.error("Error al obtener diagnóstico:", error);
			setError("No se pudo obtener información de diagnóstico");
		}
	};

	return (
		<div className="relative overflow-hidden w-full min-h-[700px] flex items-center">
			{/* Imagen de fondo con overlay */}
			<div className="absolute inset-0 z-0">
				<Image
					src="https://images.unsplash.com/photo-1607664794096-176cd60beb2e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Mercado Latino"
					fill
					priority
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-amber-800/70 to-transparent"></div>
			</div>

			{/* Elementos decorativos festivos */}
			<div className="absolute top-10 right-10 animate-bounce hidden lg:block">
				<div className="w-12 h-12 rounded-full bg-yellow-400 opacity-70"></div>
			</div>
			<div className="absolute bottom-28 left-5 animate-bounce delay-75 hidden lg:block">
				<div className="w-8 h-8 rounded-full bg-yellow-300 opacity-60"></div>
			</div>
			<div className="absolute top-32 left-16 animate-bounce delay-150 hidden lg:block">
				<div className="w-10 h-10 rounded-full bg-amber-500 opacity-60"></div>
			</div>

			{/* Patrones decorativos */}
			<div className="absolute left-0 bottom-0 w-full h-16 bg-[url('/pattern-dots.png')] opacity-20 mix-blend-overlay"></div>

			<div className="relative z-10 py-16 px-4 w-full">
				<main className="mx-auto max-w-7xl">
					<div className="max-w-3xl mx-auto md:ml-0">
						<div className="flex mb-6">
							<div className="h-2 w-20 bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full"></div>
						</div>
						<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-md">
							<span className="block mb-2">{config.appName}</span>
							<span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 font-black">
								Austin, TX
							</span>
						</h1>
						<p className="mt-6 text-xl text-amber-100 md:mt-8 max-w-xl md:text-2xl leading-relaxed drop-shadow-md">
							Conectando a la comunidad con emprendedores latinos en Austin.
							Descubre negocios locales, servicios profesionales y talentos de
							nuestra comunidad.
						</p>

						{/* Barra de búsqueda */}
						<div className="mt-10 max-w-xl relative">
							<form onSubmit={handleSearch} className="relative">
								<input
									type="text"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Buscar negocios, servicios, productos..."
									className="w-full pl-12 pr-20 py-4 bg-white/95 border-2 border-yellow-300 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
								/>
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className={`h-6 w-6 ${
											isSearching
												? "text-amber-300 animate-pulse"
												: "text-amber-500"
										}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
										/>
									</svg>
								</div>
								<button
									type="submit"
									disabled={isSearching || !searchQuery.trim()}
									className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-full transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
									{isSearching ? "Buscando..." : "Buscar"}
								</button>
							</form>

							{/* Botón de diagnóstico (solo desarrollo) */}
							{process.env.NODE_ENV !== "production" && (
								<div className="mt-2 text-center">
									<button
										onClick={fetchDiagnosticInfo}
										className="text-xs text-amber-200 underline">
										Verificar BD
									</button>
								</div>
							)}

							{/* Información de diagnóstico */}
							{showDiagnostic && diagnosticInfo && (
								<div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg p-4 max-h-96 overflow-y-auto z-50">
									<h3 className="font-medium text-gray-800 mb-2">
										Diagnóstico
									</h3>
									<p className="text-sm text-gray-600 mb-2">
										{diagnosticInfo.message}
									</p>
									{diagnosticInfo.sample && diagnosticInfo.sample.length > 0 ? (
										<div className="space-y-2">
											<p className="text-sm font-medium">
												Muestra de negocios:
											</p>
											{diagnosticInfo.sample.map((business) => (
												<div
													key={business._id}
													className="p-2 bg-gray-50 rounded">
													<p className="font-medium">{business.name}</p>
													<p className="text-xs text-gray-500">
														Categoría: {business.category} | Aprobado:{" "}
														{business.isApproved ? "Sí" : "No"}
													</p>
												</div>
											))}
										</div>
									) : (
										<p className="text-sm text-red-500">
											No hay negocios en la base de datos
										</p>
									)}
									<div className="mt-3 text-right">
										<button
											onClick={() => setShowDiagnostic(false)}
											className="text-xs text-amber-600 underline">
											Cerrar
										</button>
									</div>
								</div>
							)}

							{/* Resultados de búsqueda */}
							{searchResults.length > 0 && !showDiagnostic && (
								<div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg p-4 max-h-96 overflow-y-auto z-50">
									<div className="space-y-4">
										{searchResults.map((business) => (
											<Link
												key={business._id}
												href={`/business/${business._id}`}
												className="block p-4 hover:bg-amber-50 rounded-lg transition-colors">
												<h3 className="font-medium text-gray-800">
													{business.name}
												</h3>
												<div className="text-sm text-gray-600">
													<p>{business.category}</p>
													{business.address && (
														<p className="mt-1 text-amber-700">
															📍 {business.address}
														</p>
													)}
												</div>
											</Link>
										))}
									</div>
								</div>
							)}

							{searchResults.length === 0 &&
								hasSearched &&
								!isSearching &&
								!error &&
								!showDiagnostic && (
									<div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg p-4 z-50">
										<p className="text-gray-600 text-center py-2">
											No se encontraron resultados para "{searchQuery}"
										</p>
									</div>
								)}

							{error && (
								<div className="mt-2 text-red-100 bg-red-500/20 p-3 rounded-lg">
									{error}
								</div>
							)}
						</div>

						{/* Botones */}
						<div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
							<div className="rounded-xl shadow-lg transform transition hover:scale-105 duration-300">
								<a
									href="/directory"
									className="flex w-full items-center justify-center rounded-xl border border-transparent bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 text-base font-medium text-white hover:shadow-xl md:text-lg">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
											clipRule="evenodd"
										/>
									</svg>
									Explorar Directorio
								</a>
							</div>
							<div className="rounded-xl shadow-lg transform transition hover:scale-105 duration-300">
								<a
									href={config.auth.loginUrl}
									className="flex w-full items-center justify-center rounded-xl border-2 border-yellow-300 bg-white/90 px-8 py-4 text-base font-medium text-amber-600 hover:bg-yellow-50 hover:shadow-xl md:text-lg">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor">
										<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
									</svg>
									Registrar mi Negocio
								</a>
							</div>
						</div>

						{/* Categorías con estilo festivo */}
						<div className="mt-12 flex flex-wrap gap-3">
							<span className="flex items-center font-semibold text-amber-200 mb-3 mr-2 md:mb-0">
								<span className="mr-2">✨</span> Categorías Populares:
							</span>
							<a
								href="/directory/restaurants"
								className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
								<span className="mr-2">🍽️</span> Restaurantes
							</a>
							<a
								href="/directory/services"
								className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
								<span className="mr-2">🛠️</span> Servicios
							</a>
							<a
								href="/directory/professionals"
								className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
								<span className="mr-2">💼</span> Profesionales
							</a>
							<a
								href="/directory/events"
								className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full text-sm font-medium text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
								<span className="mr-2">🎉</span> Eventos
							</a>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export default Hero;
