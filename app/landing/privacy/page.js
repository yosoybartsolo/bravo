import Link from "next/link";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://escuelitamaker.com
// - Name: Escuelita Starter
// - Description: A template to help you start creating your own projects faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: ${config.email.supportEmail}

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

const PrivacyPolicy = () => {
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
					</svg>{" "}
					Back
				</Link>
				<h1 className="text-3xl font-extrabold pb-6">
					Privacy Policy for {config.appName}
				</h1>

				<pre
					className="leading-relaxed whitespace-pre-wrap"
					style={{ fontFamily: "sans-serif" }}>
					{`Política de Privacidad
Última actualización: 10 de abril de 2025

En Sección Latina (https://seccionlatina.org), nos comprometemos a proteger tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información.

1. Información que Recopilamos
Recopilamos la siguiente información personal cuando haces un pedido o te registras en nuestro sitio:

Nombre

Correo electrónico

Información de pago

También recopilamos datos no personales a través de cookies para mejorar la experiencia del usuario.

2. Uso de la Información
Utilizamos tu información únicamente para procesar pedidos y brindarte un mejor servicio.

3. Compartir Información
No compartimos tu información con terceros bajo ninguna circunstancia.

4. Privacidad de los Menores
No recopilamos intencionalmente datos personales de niños menores de 13 años.

5. Actualizaciones a esta Política
Cualquier cambio en esta política será notificado a los usuarios por correo electrónico.

6. Contacto
Si tienes preguntas sobre esta política, puedes escribirnos a: ${config.email.supportEmail}

Gracias por confiar en Sección Latina.`}
				</pre>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
