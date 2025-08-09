"use client";
import { useI18n } from "@/libs/i18n";

export default function LanguageSwitcher() {
	const { locale, changeLocale } = useI18n();

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={() => changeLocale("es")}
				className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
					locale === "es"
						? "text-[#e1313d] bg-white/10"
						: "text-white/70 hover:text-white"
				}`}>
				ES
			</button>
			<span className="text-white/30">|</span>
			<button
				onClick={() => changeLocale("en")}
				className={`px-2 py-1 text-sm font-medium transition-colors rounded ${
					locale === "en"
						? "text-[#e1313d] bg-white/10"
						: "text-white/70 hover:text-white"
				}`}>
				EN
			</button>
		</div>
	);
}