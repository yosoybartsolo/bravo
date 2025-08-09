"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
	{ name: "Trabajo", href: "#work" },
	{ name: "Servicios", href: "#services" },
	{ name: "Acerca de", href: "#about" },
];

const carouselImages = [
	"/images/carousel/carrusel-1.png",
	"/images/carousel/carrusel-2.png",
	"/images/carousel/carrusel-3.png",
	"/images/carousel/carrusel-4.png",
	"/images/carousel/carrusel-5.png",
	"/images/carousel/carrusel-6.png",
	"/images/carousel/carrusel-7.png",
	"/images/carousel/carrusel-8.png",
	"/images/carousel/carrusel-9.png",
	"/images/carousel/carrusel-10.png",
	"/images/carousel/carrusel-11.png",
	"/images/carousel/carrusel-12.png",
];

const handleClick = (e, href) => {
	e.preventDefault();
	const element = document.querySelector(href);
	if (element) {
		element.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
};

export default function Hero() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Cambiar imagen automáticamente cada 5 segundos
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prevIndex) => (prevIndex + 1) % carouselImages.length
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="bg-[#191919] min-h-screen flex flex-col">
			{/* Header */}
			<header className="flex items-center justify-between px-8 pt-6 max-w-7xl mx-auto w-full">
				{/* Logo */}
				<Image
					src="/logo.png"
					alt="Logo de Bravo Studio"
					width={100}
					height={100}
					className="text-white font-serif text-2xl italic font-semibold tracking-tight"
				/>
				{/* Nav - Hidden on mobile */}
				<nav className="hidden md:flex flex-1 items-center justify-center">
					<ul className="flex space-x-8">
						{navLinks.map((link) => (
							<li key={link.name}>
								<a
									href={link.href}
									onClick={(e) => handleClick(e, link.href)}
									className="text-white/90 font-light text-lg hover:text-[#e1313d] transition-colors">
									{link.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{/* Contact Button */}
				<a
					href="https://wa.me/17375870467"
					className="border border-white hover:border-[#e1313d] text-white hover:text-[#e1313d] px-5 py-1.5 rounded-full text-base font-light tracking-wide transition-colors">
					CONTACTO
				</a>
			</header>

			{/* Main Content */}
			<div className="flex flex-col max-w-5xl w-full mx-auto px-8 mt-20">
				<h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-6 text-left">
					Estrategia y diseño
				</h1>
				<p className="text-gray-300 text-lg font-light mb-12 text-left max-w-xl">
					Pam es una multidisciplinaria empresa de diseño.
				</p>
				<div className="w-full overflow-hidden bg-[#232323] border border-[#2e2e2e] relative">
					{/* Carrusel de imágenes */}
					<div className="relative w-full h-[350px] md:h-[420px]">
						{carouselImages.map((image, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-1000 ${
									index === currentImageIndex ? "opacity-100" : "opacity-0"
								}`}>
								<Image
									src={image}
									alt={`Imagen de carrusel ${index + 1}`}
									width={1200}
									height={500}
									className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
									priority={index === 0}
								/>
							</div>
						))}
					</div>
					{/* Indicadores de navegación
					<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
						{carouselImages.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentImageIndex(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 ${
									index === currentImageIndex
										? "bg-[#e1313d] scale-110"
										: "bg-white/50 hover:bg-white/70"
								}`}
								aria-label={`Ir a imagen ${index + 1}`}
							/>
						))}
					</div> */}
				</div>
			</div>
		</section>
	);
}
