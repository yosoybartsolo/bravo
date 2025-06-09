import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";
import About from "@/components/landing/About";
import Customers from "@/components/landing/Customers";

export default function Home() {
	return (
		<main className="flex flex-col w-full" style={{ scrollBehavior: "smooth" }}>
			<Hero />
			<section id="about">
				<About />
			</section>
			<Work />
			{/* <Customers /> */}
			<Services id="services" />
			<CTA id="contact" />
		</main>
	);
}
