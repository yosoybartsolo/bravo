"use client";

const projects = [
	{
		title: "Recreation",
		category: "branding",
		image: "/images/work/recreation.png",
		link: "https://www.behance.net/gallery/172291949/Recreation-Branding",
	},
	{
		title: "Volada",
		category: "photography",
		image: "/images/work/volada.png",
		link: "https://www.behance.net/gallery/211424579/Volada",
	},
	{
		title: "El Huarache",
		category: "website/branding",
		image: "/images/work/el-huarache.png",
		link: "https://www.behance.net/gallery/228995091/El-Huarache-Restaurant",
	},
	{
		title: "Oh My Guest!",
		category: "website/branding",
		image: "/images/work/ohmyguest.png",
		link: "https://www.behance.net/gallery/231448817/Oh-My-Guest",
	},
	{
		title: "Travel It",
		category: "website/branding",
		image: "/images/work/travel-it.png",
		link: "https://www.behance.net/gallery/229848337/Travel-It-Agencia-de-Viajes",
	},
	{
		title: "Recreation Photo",
		category: "photography",
		image: "/images/work/recreation-photo.png",
		link: "https://www.behance.net/gallery/207691423/Recreation",
	},
	{
		title: "Qué hacer en austin",
		category: "branding",
		image: "/images/work/quehacerenaustin.png",
		link: "https://www.behance.net/gallery/229499095/Que-Hacer-en-Austin",
	},
	{
		title: "Discodome",
		category: "photography",
		image: "/images/work/discodome.png",
		link: "https://www.behance.net/gallery/228816233/Disco-Ranch",
	},
	{
		title: "Ramen del Barrio",
		category: "branding/photography",
		image: "/images/work/ramen-del-barrio.png",
		link: "https://www.behance.net/gallery/228819197/Ramen-Del-Barrio",
	},
];

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/libs/i18n";

const Work = () => {
	const { t } = useI18n();

	return (
		<section className="bg-[#191919] min-h-screen w-full px-6 md:px-20 py-16">
			<div className="max-w-7xl mx-auto">
				<div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
					<h2 className="text-white text-5xl sm:text-6xl md:text-7xl font-light mb-4 md:mb-11">
						{t("work.title")}
					</h2>
					<div className="flex items-center gap-4">
						<p className="text-gray-200 text-lg max-w-md">
							{t("work.description")}
						</p>
						<span className="w-4 h-4 bg-white rounded-full inline-block ml-4"></span>
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{projects.map((project, idx) => (
						<div
							key={idx}
							className="bg-[#232323] shadow-lg overflow-hidden flex flex-col border border-[#2e2e2e]">
							<Link href={project.link} target="_blank">
								<div className="w-full aspect-[4/3] bg-gray-800 overflow-hidden">
									<Image
										src={project.image}
										alt={project.title}
										width={600}
										height={450}
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
							</Link>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-center mt-12">
				<a
					href="https://www.behance.net/bravocreatives"
					className="w-64 inline-block text-white text-center text-lg md:text-xl font-semibold uppercase tracking-widest px-10 py-4  shadow-lg transition-colors duration-200 hover:bg-[#191919]/10 hover:text-[#e1313d] border border-white hover:border-[#e1313d]  px-auto">
					{t("work.viewMore")}
				</a>
			</div>
		</section>
	);
};

export default Work;
