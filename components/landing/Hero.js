"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useI18n } from "@/libs/i18n";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

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
	const { t } = useI18n();

	// image duration 5 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prevIndex) => (prevIndex + 1) % carouselImages.length
			);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	const navLinks = [
		{ name: t("nav.work"), href: "#work" },
		{ name: t("nav.services"), href: "#services" },
		{ name: t("nav.about"), href: "#about" },
	];

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
				{/* Language Switcher */}
				<div className="mr-1 ml-3 md:mr-4">
					<LanguageSwitcher />
				</div>
				{/* Contact Button */}
				<a
					href="/landing/contact"
					className="border border-white hover:border-[#e1313d] text-white hover:text-[#e1313d] px-5 py-1.5 rounded-full text-base font-light tracking-wide transition-colors">
					{t("nav.contact")}
				</a>
			</header>

			{/* Main Content */}
			<div className="flex flex-col max-w-5xl w-full mx-auto px-8 mt-20">
				<h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-light leading-tight mb-6 text-left">
					{t("hero.title")}
				</h1>
				<p className="text-gray-300 text-lg font-light mb-12 text-left max-w-xl">
					{t("hero.subtitle")}
				</p>
				<div className="w-full overflow-hidden bg-[#232323] border border-[#2e2e2e] relative">
					{/* Carrusel de imágenes */}
					<div className="relative w-full h-[350px] md:h-[420px]">
						{carouselImages.map((image, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-opacity duration-[5000ms] ease-in-out ${
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
				</div>
			</div>
		</section>
	);
}
