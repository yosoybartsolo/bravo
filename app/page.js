import Image from "next/image";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <Pricing />
    </main>
  );
}
