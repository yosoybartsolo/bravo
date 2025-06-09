"use client";
import Image from "next/image";

const navLinks = [
	{ name: "Trabajo", href: "#" },
	{ name: "Servicios", href: "#" },
	{ name: "Boletín", href: "#" },
	{ name: "Empleo", href: "#" },
	{ name: "Acerca de", href: "#" },
];

export default function Hero() {
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
				{/* Nav */}
				<nav className="flex-1 flex items-center justify-center">
					<ul className="flex space-x-8">
						{navLinks.map((link) => (
							<li key={link.name}>
								<a
									href={link.href}
									className="text-white/90 font-light text-lg hover:text-[#e1313d] transition-colors">
									{link.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{/* Contact Button */}
				<a
					href="#contacto"
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
				<div className="w-full overflow-hidden bg-[#232323] border border-[#2e2e2e]">
					<Image
						src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80"
						alt="Ejemplo de trabajo de diseño"
						width={1200}
						height={500}
						className="object-cover w-full h-[350px] md:h-[420px] hover:scale-105 transition-all duration-500"
						priority
					/>
				</div>
			</div>
		</section>
	);
}
