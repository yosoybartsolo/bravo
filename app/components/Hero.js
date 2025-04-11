"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Hero() {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState(null);
	const router = useRouter();

	const handleSearch = async (e) => {
		e.preventDefault();
		const query = searchQuery.trim();
		if (!query) return;

		setIsSearching(true);
		setError(null);
		try {
			const response = await fetch(
				`/api/search?q=${encodeURIComponent(query)}`
			);
			if (!response.ok) {
				throw new Error("Error en la búsqueda");
			}
			const data = await response.json();
			setSearchResults(data.businesses);
		} catch (error) {
			console.error("Error en la búsqueda:", error);
			setError(
				"Hubo un error al realizar la búsqueda. Por favor, intenta de nuevo."
			);
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 py-20">
			<div className="absolute inset-0 bg-black/20"></div>
			<div className="container mx-auto px-4 relative z-10">
				<div className="max-w-3xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Encuentra los mejores negocios latinos en Austin
					</h1>
					<p className="text-xl text-white/90 mb-8">
						Descubre y apoya a emprendedores latinos en tu comunidad
					</p>

					<form onSubmit={handleSearch} className="relative">
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Buscar negocios..."
							className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-lg"
						/>
						<button
							type="submit"
							disabled={isSearching || !searchQuery.trim()}
							className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
							{isSearching ? "Buscando..." : "Buscar"}
						</button>
					</form>

					{error && (
						<div className="mt-4 text-red-100 bg-red-500/20 p-3 rounded-lg">
							{error}
						</div>
					)}

					{/* Resultados de búsqueda */}
					{searchResults.length > 0 && (
						<div className="mt-8 bg-white rounded-xl shadow-lg p-4 max-h-96 overflow-y-auto">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Resultados de búsqueda
							</h2>
							<div className="space-y-4">
								{searchResults.map((business) => (
									<Link
										key={business._id}
										href={`/business/${business._id}`}
										className="block p-4 hover:bg-amber-50 rounded-lg transition-colors">
										<h3 className="font-medium text-gray-800">
											{business.name}
										</h3>
										<p className="text-sm text-gray-600">{business.category}</p>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
