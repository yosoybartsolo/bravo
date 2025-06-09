const CTA = () => {
	return (
		<section className="w-full bg-[#191919] py-20 px-4 flex items-center justify-center">
			<div className="max-w-3xl w-full mx-auto flex flex-col items-center text-center gap-8">
				<h2 className="text-white text-4xl md:text-6xl font-light leading-tight tracking-tight">
					¿Listo para llevar tu marca al siguiente nivel?
				</h2>
				<p className="text-gray-200 text-lg md:text-2xl font-normal max-w-xl">
					Ponte en contacto con nuestro estudio creativo y descubre cómo podemos
					ayudarte a destacar.
				</p>
				<a
					href="https://wa.me/17375870467"
					className="inline-block bg-[#e1313d] text-black text-lg md:text-xl font-semibold uppercase tracking-widest px-10 py-4  shadow-lg transition-colors duration-200 hover:bg-[#e1313d]/10 hover:text-[#e1313d] border-2 border-[#e1313d]">
					Contactar
				</a>
			</div>
		</section>
	);
};

export default CTA;
