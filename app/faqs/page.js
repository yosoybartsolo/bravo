"use client";

const faqs = [
	{
		pregunta: "¿Qué es Sección Latina?",
		respuesta:
			"Sección Latina es un directorio web dedicado a conectar a la comunidad latina en Austin con emprendedores y negocios latinos. Nuestro objetivo es promover y visibilizar los negocios latinos en la ciudad, facilitando su descubrimiento y acceso.",
	},
	{
		pregunta: "¿Cómo puedo añadir mi negocio?",
		respuesta:
			"Para añadir tu negocio, simplemente crea una cuenta en nuestro dashboard y sigue el proceso de registro. Necesitarás proporcionar información básica como nombre, categoría, descripción, y datos de contacto. También podrás subir el logo de tu negocio.",
	},
	{
		pregunta: "¿Hay algún costo por listar mi negocio?",
		respuesta:
			"No, actualmente el servicio es completamente gratuito. Nuestra misión es apoyar a la comunidad emprendedora latina sin costos de membresía o comisiones.",
	},
	{
		pregunta: "¿Qué tipo de negocios pueden registrarse?",
		respuesta:
			"Bienvenimos a todo tipo de negocios latinos en Austin, desde restaurantes y tiendas hasta servicios profesionales y emprendimientos digitales. Lo importante es que sean propiedad de latinos y operen en el área de Austin.",
	},
	{
		pregunta: "¿Cómo puedo actualizar la información de mi negocio?",
		respuesta:
			"Puedes actualizar la información de tu negocio en cualquier momento accediendo a tu dashboard. Allí encontrarás todas las opciones para modificar datos, cambiar imágenes, y mantener tu perfil actualizado.",
	},
	{
		pregunta: "¿Qué información se muestra en el perfil de mi negocio?",
		respuesta:
			"El perfil de tu negocio muestra: nombre, categoría, descripción, logo, información de contacto (WhatsApp, email), dirección, enlaces a redes sociales, y ubicación en Google Maps si la proporcionas.",
	},
];

export default function FaqsPage() {
	return (
		<div className="min-h-screen bg-amber-50/50 py-12">
			{/* Header */}
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
						Preguntas Frecuentes
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Encuentra respuestas a las preguntas más comunes sobre Sección
						Latina y cómo podemos ayudarte a conectar con la comunidad.
					</p>
				</div>

				{/* FAQs Grid */}
				<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className={`p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
								index % 2 === 0
									? "bg-white border border-amber-100"
									: "bg-amber-50/80 border border-amber-200/50"
							}`}>
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
									<span className="text-amber-600 font-bold">{index + 1}</span>
								</div>
								<div>
									<h3 className="text-lg font-semibold text-amber-700 mb-3">
										{faq.pregunta}
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{faq.respuesta}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Contact Section */}
				<div className="mt-12 text-center">
					<p className="text-gray-600 mb-4">¿No encontraste lo que buscabas?</p>
					<a
						href="/contact"
						className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md">
						<span>Contáctanos</span>
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
