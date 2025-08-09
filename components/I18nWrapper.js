"use client";
import { I18nProvider } from "@/libs/i18n";

export default function I18nWrapper({ children }) {
	return <I18nProvider>{children}</I18nProvider>;
}