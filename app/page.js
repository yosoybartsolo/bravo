import Hero from "@/components/landing/Hero";
import Categories from "@/components/landing/Categories";

export default function Home() {
	return (
		<main className="flex flex-col w-full">
			<Hero />
			<Categories />
		</main>
	);
}
