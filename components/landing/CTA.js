const CTA = () => {
	return (
		<section className="w-full bg-[#191919] py-20 px-4 flex ">
			<div className="max-w-3xl w-full mx-36 flex flex-col  gap-8">
				<h2 className="text-white text-5xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight">
					¿Listo para llevar tu marca al siguiente nivel?
				</h2>
				<p className="text-gray-200 text-lg md:text-2xl font-normal max-w-xl">
					Ponte en contacto con nuestro estudio creativo y descubre cómo podemos
					ayudarte a destacar.
				</p>
				<a
					href="https://wa.me/17375870467"
					className="w-64 inline-block bg-[#e1313d] text-center text-black text-lg md:text-xl font-semibold uppercase tracking-widest px-10 py-4  shadow-lg transition-colors duration-200 hover:bg-[#e1313d]/10 hover:text-[#e1313d] border-2 border-[#e1313d] px-auto">
					Contactar
				</a>
			</div>
		</section>
	);
};

export default CTA;
