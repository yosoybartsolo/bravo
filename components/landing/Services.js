"use client";
import { useState } from "react";

const services = [
	{
		name: "BRANDING ESTRATÉGICO",
		description:
			"Construimos marcas sólidas y memorables que conectan con tu audiencia y diferencian tu negocio en el mercado.",
	},
	{
		name: "DISEÑO DE LOGOTIPO E IDENTIDAD VISUAL",
		description:
			"Creamos logotipos e identidades visuales coherentes, funcionales y distintivas para tu marca.",
	},
	{
		name: "FOTOGRAFÍA PROFESIONAL",
		description:
			"Capturamos la esencia de tu marca y productos con fotografía profesional de alta calidad.",
	},
	{
		name: "DISEÑO Y DESARROLLO WEB / SOFTWARE",
		description:
			"Desarrollamos sitios web y software a medida, funcionales, modernos y alineados a tus objetivos.",
	},
	{
		name: "DISEÑO Y DESARROLLO APPS Y WEBAPPS",
		description:
			"Creamos aplicaciones y webapps intuitivas, escalables y atractivas para potenciar tu negocio.",
	},
];

const brandLogo = (
	<span
		className="font-black text-3xl tracking-widest"
		style={{ fontFamily: "monospace" }}>
		BRAVO
	</span>
);

const Services = () => {
	const [active, setActive] = useState(0);
	return (
		<section className="min-h-screen w-full bg-[#e1313d] flex flex-col justify-between px-0 py-0">
			<div className="max-w-5xl mx-auto w-full flex flex-col min-h-screen">
				{/* Título */}
				<header className="pt-12 pb-0 px-6">
					<h2 className="text-black text-[4rem] md:text-8xl font-light leading-none tracking-tight">
						Servicios
					</h2>
				</header>
				{/* Contenido principal */}
				<div className="flex-1 flex flex-col md:flex-row items-stretch justify-between px-6">
					{/* Espacio explicativo */}
					<div className="flex-1 flex items-center justify-center">
						<div className="max-w-xl text-center md:text-left">
							<p className="text-black text-2xl md:text-3xl font-light leading-snug min-h-[120px] transition-all duration-300">
								{services[active].description}
							</p>
						</div>
					</div>
				</div>
				{/* Lista de servicios y logo */}
				<footer className="w-full flex flex-col md:flex-row items-end justify-between border-t border-black px-6 pb-10 pt-8 gap-8">
					<ol className="flex-1 flex flex-col gap-2">
						{services.map((s, idx) => (
							<li key={s.name}>
								<button
									onClick={() => setActive(idx)}
									className={`w-full text-left text-lg md:text-xl font-semibold tracking-wide uppercase px-0 py-2 transition-colors duration-200
										${
											active === idx
												? "text-[#e1313d] bg-[#191919]"
												: "text-[#191919] hover:text-white hover:bg-[#191919]"
										}
									`}
									style={{ outline: "none" }}>
									<span className="font-mono mr-2 text-base">
										{String(idx + 1).padStart(2, "0")}.
									</span>{" "}
									{s.name}
								</button>
							</li>
						))}
					</ol>
					{/* <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-12">{brandLogo}</div> */}
				</footer>
			</div>
		</section>
	);
};

export default Services;
