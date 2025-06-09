const projects = [
	{
		title: "vers",
		category: "branding",
		image:
			"https://assets-global.website-files.com/5f6b7b6b6b6b6b6b6b6b6b6b/63e3b6b6b6b6b6b6b6b6b6b6_vers.png",
	},
	{
		title: "Mobilis",
		category: "website",
		image:
			"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Pam Studio",
		category: "branding",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Fresh App",
		category: "website",
		image:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Denim",
		category: "fotografía / editorial",
		image:
			"https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
	},
	{
		title: "Minimal",
		category: "editorial",
		image:
			"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
	},
];

const Work = () => {
	return (
		<section className="bg-[#232323] min-h-screen w-full px-8 py-16">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
					<h2 className="text-white text-7xl font-light mb-4 md:mb-0">
						Trabajo
					</h2>
					<div className="flex items-center gap-4">
						<p className="text-gray-200 text-lg max-w-md">
							Párrafo. Haz clic aquí para agregar tu propio texto y editar. Aquí
							puedes contar tu historia y permitir que tus usuarios sepan más
							sobre ti.
						</p>
						<span className="w-4 h-4 bg-white rounded-full inline-block ml-4"></span>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className="bg-[#232323] shadow-lg overflow-hidden flex flex-col border border-[#2e2e2e]">
							<div className="w-full aspect-[4/3] bg-gray-800 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<h3 className="text-white text-xl font-semibold">
									{project.title}
								</h3>
								<p className="text-gray-400 text-base capitalize">
									{project.category}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Work;
