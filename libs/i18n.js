"use client";
import { createContext, useContext, useState, useEffect } from "react";

const I18nContext = createContext();

export const translations = {
	es: {
		// Navigation
		nav: {
			work: "Trabajo",
			services: "Servicios",
			about: "Acerca de",
			contact: "CONTACTO",
		},
		// Hero section
		hero: {
			title: "Diseño y Experiencia",
			subtitle:
				"Construye una identidad sólida y visualmente poderosa que impulse tu empresa al siguiente nivel.",
		},
		// About section
		about: {
			title: "Acerca de",
			description:
				"Hacemos diseño, fotografía, desarrollo web y de aplicaciones.\nSomos un equipo de creativos visionarios, unidos para entregar proyectos innovadores y experiencias únicas que cuentan historias, crean impacto y ayudan a tu marca a crecer.",
		},
		// Services section
		services: {
			title: "Servicios",
			list: [
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
			],
		},
		// Work section
		work: {
			title: "Trabajo",
			description:
				"Una muestra del trabajo que hemos hecho con marcas que confiaron en nuestra visión. Diseño, web y fotografía pensados para emocionar, comunicar y dejar huella.",
			viewMore: "Ver más",
		},
		// CTA section
		cta: {
			title: "¿Listo para llevar tu marca al siguiente nivel?",
			description:
				"Ponte en contacto con nuestro estudio creativo y descubre cómo podemos ayudarte a destacar.",
			button: "Contactar",
		},
		// Contact page
		contact: {
			title: "Contáctanos",
			subtitle:
				"Cuéntanos sobre tu proyecto y te ayudaremos a hacerlo realidad",
			formTitle: "Danos más detalles sobre lo que necesitas",
			fields: {
				fullName: "Nombre completo *",
				email: "Email *",
				phone: "Teléfono",
				company: "Nombre de la empresa",
				serviceType: "Tipo de servicio que necesita *",
				projectDescription: "Breve descripción del proyecto *",
			},
			placeholders: {
				fullName: "Tu nombre completo",
				email: "tu@email.com",
				phone: "+1 (555) 123-4567",
				company: "Nombre de tu empresa",
				projectDescription:
					"Describe tu proyecto, objetivos, timeline, presupuesto aproximado, etc.",
			},
			serviceOptions: [
				"Diseño de Logotipo e Identidad Visual",
				"Fotografía Profesional",
				"Branding/Rebranding",
				"Diseño y Desarrollo Web",
				"Diseño y desarrollo de Apps y Webapps",
			],
			selectPlaceholder: "Selecciona una opción",
			submitButton: "Enviar mensaje",
			submitting: "Enviando...",
			directContact: {
				title: "¿Prefieres contactarnos directamente?",
				description:
					"También puedes escribirnos directamente o seguirnos en nuestras redes sociales",
			},
			validation: {
				fullNameRequired: "El nombre completo es requerido",
				emailRequired: "El email es requerido",
				emailInvalid: "Email inválido",
				serviceTypeRequired: "Por favor selecciona un tipo de servicio",
				projectDescriptionRequired: "La descripción del proyecto es requerida",
				projectDescriptionMin:
					"La descripción debe tener al menos 20 caracteres",
			},
			messages: {
				success: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
				error: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
			},
		},
	},
	en: {
		// Navigation
		nav: {
			work: "Work",
			services: "Services",
			about: "About",
			contact: "CONTACT",
		},
		// Hero section
		hero: {
			title: "Design & Experience",
			subtitle:
				"Build a strong, visually powerful identity that takes your business to the next level.",
		},
		// About section
		about: {
			title: "About",
			description:
				"We do design, photography, web and app development.\nWe're a team of visionary creatives, united to deliver innovative projects and unique experiences that tell stories, create impact, and help your brand grow.",
		},
		// Services section
		services: {
			title: "Services",
			list: [
				{
					name: "STRATEGIC BRANDING",
					description:
						"We build solid and memorable brands that connect with your audience and differentiate your business in the market.",
				},
				{
					name: "LOGO DESIGN & VISUAL IDENTITY",
					description:
						"We create coherent, functional and distinctive logos and visual identities for your brand.",
				},
				{
					name: "PROFESSIONAL PHOTOGRAPHY",
					description:
						"We capture the essence of your brand and products with high-quality professional photography.",
				},
				{
					name: "WEB DESIGN & SOFTWARE DEVELOPMENT",
					description:
						"We develop custom websites and software that are functional, modern and aligned with your goals.",
				},
				{
					name: "APP & WEBAPP DESIGN & DEVELOPMENT",
					description:
						"We create intuitive, scalable and attractive applications and webapps to boost your business.",
				},
			],
		},
		// Work section
		work: {
			title: "Work",
			description:
				"A glimpse into the work we've done with brands that believed in our vision. Design, web, and photography crafted to move, communicate, and leave a mark.",
			viewMore: "View more",
		},
		// CTA section
		cta: {
			title: "Ready to take your brand to the next level?",
			description:
				"Get in touch with our creative studio and discover how we can help you stand out.",
			button: "Contact",
		},
		// Contact page
		contact: {
			title: "Contact Us",
			subtitle:
				"Tell us about your project and we'll help you make it a reality",
			formTitle: "Give us more details about what you need",
			fields: {
				fullName: "Full name *",
				email: "Email *",
				phone: "Phone",
				company: "Company name",
				serviceType: "Type of service needed *",
				projectDescription: "Brief project description *",
			},
			placeholders: {
				fullName: "Your full name",
				email: "your@email.com",
				phone: "+1 (555) 123-4567",
				company: "Your company name",
				projectDescription:
					"Describe your project, objectives, timeline, approximate budget, etc.",
			},
			serviceOptions: [
				"Logo Design & Visual Identity",
				"Professional Photography",
				"Branding/Rebranding",
				"Web Design & Development",
				"App & Webapp Design & Development",
			],
			selectPlaceholder: "Select an option",
			submitButton: "Send message",
			submitting: "Sending...",
			directContact: {
				title: "Prefer to contact us directly?",
				description:
					"You can also write to us directly or follow us on our social media",
			},
			validation: {
				fullNameRequired: "Full name is required",
				emailRequired: "Email is required",
				emailInvalid: "Invalid email",
				serviceTypeRequired: "Please select a service type",
				projectDescriptionRequired: "Project description is required",
				projectDescriptionMin:
					"Description must be at least 20 characters long",
			},
			messages: {
				success: "Message sent successfully! We'll contact you soon.",
				error: "Error sending message. Please try again.",
			},
		},
	},
};

export function I18nProvider({ children }) {
	const [locale, setLocale] = useState("es");

	useEffect(() => {
		const savedLocale = localStorage.getItem("locale");
		if (savedLocale && translations[savedLocale]) {
			setLocale(savedLocale);
		}
	}, []);

	const changeLocale = (newLocale) => {
		if (translations[newLocale]) {
			setLocale(newLocale);
			localStorage.setItem("locale", newLocale);
		}
	};

	const t = (key) => {
		const keys = key.split(".");
		let value = translations[locale];

		for (const k of keys) {
			value = value?.[k];
		}

		return value || key;
	};

	return (
		<I18nContext.Provider value={{ locale, changeLocale, t }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useI18n() {
	const context = useContext(I18nContext);
	if (!context) {
		throw new Error("useI18n must be used within I18nProvider");
	}
	return context;
}
