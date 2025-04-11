"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import categoriesData from "@/data/categories.json";

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		setCategories(categoriesData);
	}, []);

	return (
		<section className="py-10 bg-gradient-to-b from-white to-amber-50">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
						Categorías de Negocios
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						Explora los diferentes negocios latinos en Austin organizados por
						categorías. ¡Encuentra exactamente lo que buscas!
					</p>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
					{categories.map((category) => (
						<Link
							href={`/categories/${category.id}`}
							key={category.id}
							className="category-card flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md border border-yellow-100 hover:shadow-lg hover:border-yellow-300 transition-all duration-300 text-center">
							<div className="text-4xl mb-3 bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center">
								{category.emoji}
							</div>
							<h3 className="text-amber-700 font-medium">{category.name}</h3>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default Categories;
