const testimonials = [
	{
		text: "Bravo Studio superó nuestras expectativas. El branding y la web que crearon nos ayudaron a conectar con más clientes y crecer como empresa.",
		name: "María López",
		company: "CEO, Café Aroma",
	},
	{
		text: "El equipo de Bravo entiende perfectamente lo que una marca necesita para destacar. Su creatividad y profesionalismo son excepcionales.",
		name: "Carlos Méndez",
		company: "Director Creativo, Agencia Nova",
	},
	{
		text: "Trabajar con Bravo fue una experiencia increíble. Nos guiaron en todo el proceso y el resultado fue una plataforma digital moderna y funcional.",
		name: "Ana Torres",
		company: "Fundadora, EcoMarket",
	},
];

const Customers = () => {
	return (
		<section className="w-full bg-[#191919] py-24 px-4 flex items-center justify-center">
			<div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-12">
				<h2 className="text-5xl md:text-6xl font-light text-white mb-8 tracking-tight text-center">
					Lo que dicen{" "}
					<span className="text-[#e1313d] font-bold">nuestros clientes</span>
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
					{testimonials.map((t, idx) => (
						<div
							key={idx}
							className="bg-[#232323] rounded-3xl shadow-xl p-8 flex flex-col items-start h-full border border-[#e1313d]/20">
							<p className="text-white text-lg md:text-xl font-light mb-6">
								“{t.text}”
							</p>
							<div className="mt-auto">
								<span className="block text-[#e1313d] font-bold text-base">
									{t.name}
								</span>
								<span className="block text-gray-400 text-sm font-medium">
									{t.company}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Customers;
