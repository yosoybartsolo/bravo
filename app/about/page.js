"use client";
import Image from "next/image";

const teams = [
	{
		location: "Austin, Texas",
		description:
			"El equipo de Austin lidera las operaciones locales y la conexión directa con la comunidad latina emprendedora.",
		members: [
			{
				name: "Kathia Marroquín",
				role: "¿Qué hacer en Austin?",
				description:
					"Emprendedor latino con más de 10 años conectando negocios en Austin. Experto en desarrollo comunitario y networking local.",
				image: "/team/kathia.jpg",
				linkedin: "https://linkedin.com/in/kathia-garcia",
				email: "kathia@seccionlatina.com",
			},
			{
				name: "Adrian Carrillo",
				role: "Bravo",
				description:
					"Fotógrafo, experto en marketing digital, diseño de producto, branding y co-fundador de Bravo",
				image: "/team/ana.jpg",
				linkedin: "https://linkedin.com/in/anagarcia",
				email: "ana@seccionlatina.com",
			},
		],
	},
	{
		location: "Chihuahua, Mexico",
		description:
			"El equipo de desarrollo tecnológico, responsable de crear y mantener la plataforma digital que hace posible esta conexión.",
		members: [
			{
				name: "Bart Lopez",
				role: "EscuelitaMaker, Cherry Labs, Molus.co",
				description:
					"Desarrollador full-stack senior con experiencia en startups. Líder del equipo técnico y arquitecto principal de la plataforma.",
				image: "/images/bart.jpeg",
				linkedin: "https://linkedin.com/in/yosoybartsolo",
				email: "yosoybartsolo@gmail.com",
			},
			{
				name: "Andy Ornelas",
				role: "Bravo, Cherry Labs",
				description:
					"Diseñador de experiencias de usuario con un enfoque en la accesibilidad y la usabilidad. Creador de interfaces intuitivas y accesibles para nuestra comunidad.",
				image: "/team/andy.jpg",
				linkedin: "https://linkedin.com/in/andyornelas",
				email: "andy@seccionlatina.com",
			},
		],
	},
];

const values = [
	{
		title: "Colaboración Internacional",
		description:
			"Unimos talentos de diferentes países para crear una plataforma que verdaderamente entiende y sirve a la comunidad latina.",
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
				/>
			</svg>
		),
	},
	{
		title: "Innovación",
		description:
			"Combinamos tecnología de punta con un profundo entendimiento cultural para crear soluciones efectivas y relevantes.",
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M13 10V3L4 14h7v7l9-11h-7z"
				/>
			</svg>
		),
	},
	{
		title: "Impacto Local",
		description:
			"Aunque somos un equipo internacional, nuestro enfoque está en generar un impacto real en la comunidad latina de Austin.",
		icon: (
			<svg
				className="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
		),
	},
];

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-amber-50/50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-6">
						Un Equipo Binacional
					</h1>
					<p className="text-xl max-w-3xl mx-auto text-amber-50">
						Sección Latina es el resultado de la colaboración entre equipos de
						Austin y Chihuahua, México, unidos por la misión de empoderar a la
						comunidad latina emprendedora.
					</p>
				</div>
			</div>

			{/* Values Section */}
			<div className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center text-amber-800 mb-12">
						Nuestros Valores
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{values.map((value, index) => (
							<div
								key={index}
								className="p-6 bg-amber-50 rounded-xl border border-amber-100 hover:shadow-lg transition-all duration-300">
								<div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white mb-4">
									{value.icon}
								</div>
								<h3 className="text-xl font-semibold text-amber-700 mb-3">
									{value.title}
								</h3>
								<p className="text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Teams Section */}
			{teams.map((team, teamIndex) => (
				<div
					key={teamIndex}
					className={`py-16 ${
						teamIndex % 2 === 0 ? "bg-white" : "bg-amber-50/80"
					}`}>
					<div className="container mx-auto px-4">
						<div className="max-w-6xl mx-auto">
							<div className="flex flex-col items-center mb-12">
								<div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-amber-100 text-amber-800 mb-4">
									<span className="text-sm font-medium">{team.location}</span>
								</div>
								<p className="text-xl text-gray-600 text-center max-w-2xl">
									{team.description}
								</p>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								{team.members.map((member, index) => (
									<div
										key={index}
										className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
										<div className="flex flex-col md:flex-row">
											<div className="md:w-1/3 aspect-square relative bg-amber-100">
												{member.image && (
													<Image
														src={member.image}
														alt={member.name}
														fill
														className="object-cover"
													/>
												)}
												{!member.image && (
													<div className="w-full h-full flex items-center justify-center">
														<span className="text-4xl text-amber-500">
															{member.name.charAt(0)}
														</span>
													</div>
												)}
											</div>
											<div className="p-6 md:w-2/3">
												<h3 className="text-xl font-semibold text-amber-700 mb-1">
													{member.name}
												</h3>
												<p className="text-amber-500 text-sm mb-3">
													{member.role}
												</p>
												<p className="text-gray-600 mb-4">
													{member.description}
												</p>
												<div className="flex space-x-4">
													{member.linkedin && (
														<a
															href={member.linkedin}
															target="_blank"
															rel="noopener noreferrer"
															className="text-blue-600 hover:text-blue-700">
															<svg
																className="w-5 h-5"
																fill="currentColor"
																viewBox="0 0 24 24">
																<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
															</svg>
														</a>
													)}
													{member.email && (
														<a
															href={`mailto:${member.email}`}
															className="text-amber-600 hover:text-amber-700">
															<svg
																className="w-5 h-5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24">
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
																/>
															</svg>
														</a>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			))}

			{/* Join Us Section */}
			<div className="py-16 bg-amber-100/50">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold text-amber-800 mb-6">
						Sé Parte de Nuestra Comunidad
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto mb-8">
						¿Tienes un negocio latino en Austin? Únete a nuestra comunidad
						internacional y forma parte de esta iniciativa para fortalecer el
						emprendimiento latino.
					</p>
					<a
						href="/dashboard"
						className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
						<span>Registra tu Negocio</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 ml-2"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	);
}
