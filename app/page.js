import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";
import About from "@/components/landing/About";

export default function Home() {
	return (
		<main className="flex flex-col w-full" style={{ scrollBehavior: "smooth" }}>
			<Hero />
			<section id="about">
				<About />
			</section>
			<section id="work">
				<Work />
			</section>
			{/* <Customers /> */}
			<section id="services">
				<Services />
			</section>
			<section id="contact">
				<CTA />
			</section>
		</main>
	);
}
