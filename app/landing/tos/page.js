import Link from "next/link";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

const TOS = () => {
	return (
		<main className="bg-base-100 w-full min-h-screen flex flex-col justify-center items-center">
			<div className="p-5 max-w-2xl w-full">
				<Link href="/" className="btn btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5">
						<path
							fillRule="evenodd"
							d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
							clipRule="evenodd"
						/>
					</svg>
					Back
				</Link>
				<h1 className="text-3xl font-extrabold pb-6">
					Terms and Conditions for {config.appName}
				</h1>

				<pre
					className="leading-relaxed whitespace-pre-wrap"
					style={{ fontFamily: "sans-serif" }}>
					{`Términos y Condiciones de Servicio
Última actualización: 10 de abril de 2025

Bienvenido a Sección Latina (https://seccionlatina.org). Al utilizar este sitio, aceptas los siguientes términos y condiciones:

1. Descripción del Servicio
Sección Latina es un directorio de emprendedores latinos en Texas. Los usuarios pueden registrar sus negocios en el directorio de manera gratuita. Nuestro único propósito es apoyar a la comunidad latina en Texas.

2. Propiedad del Contenido
Los usuarios conservan los derechos sobre la información de sus negocios. Al subir contenido, autorizan a Sección Latina a mostrar dicha información en el sitio web.

3. Información del Usuario
Recopilamos nombre, correo electrónico e información de pago para fines de administración y contacto. También utilizamos cookies para mejorar la experiencia del usuario.

4. Privacidad
Consulta nuestra Política de Privacidad para más detalles: https://seccionlatina.org/privacy-policy

5. Cambios en los Términos
Podemos actualizar estos Términos en cualquier momento. Notificaremos a los usuarios registrados por correo electrónico sobre cualquier cambio.

6. Ley Aplicable
Estos términos se rigen por las leyes de los Estados Unidos.

7. Contacto
Si tienes alguna pregunta, puedes escribirnos a: yosoybartsolo@gmail.com

Gracias por ser parte de Sección Latina.`}
				</pre>
			</div>
		</main>
	);
};

export default TOS;
