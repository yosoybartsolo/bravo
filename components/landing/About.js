"use client";
import { useI18n } from "@/libs/i18n";

const About = () => {
	const { t } = useI18n();
	const aboutText = t("about.description");
	const lines = aboutText.split('\n');
	
	return (
	<section className="bg-[#191919] w-full flex justify-center items-center py-16 px-4">
		<div className="w-full max-w-6xl bg-[#e1313d] flex flex-col md:flex-row items-center justify-between shadow-xl px-6 md:px-16 py-12 gap-8">
			<div className="flex-1 text-black text-2xl md:text-3xl font-extrabold leading-tight mb-6 md:mb-0">
				{lines[0]}
			</div>
			<div className="flex-1 text-black text-base md:text-lg font-light md:pl-8 text-left">
				{lines[1]}
			</div>
		</div>
	</section>
	);
};

export default About;