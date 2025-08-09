"use client";
import { useState } from "react";
import { useI18n } from "@/libs/i18n";

const Services = () => {
	const [active, setActive] = useState(0);
	const { t } = useI18n();
	const services = t("services.list");
	
	return (
		<section className="min-h-screen w-full bg-[#e1313d] flex flex-col justify-between px-0 py-0">
			<div className="max-w-5xl mx-auto w-full flex flex-col min-h-screen">
				{/* Título */}
				<header className="pt-12 pb-0 px-6">
					<h2 className="text-black text-5xl text-5xl sm:text-6xl md:text-7xl font-light leading-none tracking-tight">
						{t("services.title")}
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
				</footer>
			</div>
		</section>
	);
};

export default Services;
