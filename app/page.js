import Hero from "@/components/landing/Hero";
import Work from "@/components/landing/Work";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";

export default function Home() {
	return (
		<main className="flex flex-col w-full">
			<Hero />
			<Work />
			<Services />
			<CTA />
		</main>
	);
}
