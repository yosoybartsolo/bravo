"use client";

import { useForm } from "react-hook-form";
import {
	Input,
	TextArea,
	Select,
} from "@/components/forms/fields";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useI18n } from "@/libs/i18n";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Contact = () => {
	const { t } = useI18n();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [isLoading, setIsLoading] = useState(false);

	const serviceOptions = t("contact.serviceOptions");

	const handleClick = (e, href) => {
		e.preventDefault();
		window.location.href = href;
	};

	const navLinks = [
		{ name: t("nav.work"), href: "/#work" },
		{ name: t("nav.services"), href: "/#services" },
		{ name: t("nav.about"), href: "/#about" },
	];

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const response = await axios.post("/api/contact", data);

			if (response.status === 200) {
				toast.success(t("contact.messages.success"));
				reset(); // Limpiar el formulario
			}
		} catch (error) {
			console.error("Error al enviar el mensaje:", error);
			toast.error(t("contact.messages.error"));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="flex flex-col w-full min-h-screen bg-[#191919]">
			{/* Header with Navbar */}
			<header className="flex items-center justify-between px-8 pt-6 max-w-7xl mx-auto w-full">
				{/* Logo */}
				<a href="/">
					<Image
						src="/logo.png"
						alt="Logo de Bravo Studio"
						width={100}
						height={100}
						className="text-white font-serif text-2xl italic font-semibold tracking-tight"
					/>
				</a>
				{/* Nav - Hidden on mobile */}
				<nav className="hidden md:flex flex-1 items-center justify-center">
					<ul className="flex space-x-8">
						{navLinks.map((link) => (
							<li key={link.name}>
								<a
									href={link.href}
									onClick={(e) => handleClick(e, link.href)}
									className="text-white/90 font-light text-lg hover:text-[#e1313d] transition-colors">
									{link.name}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{/* Language Switcher */}
				<div className="hidden md:block mr-4">
					<LanguageSwitcher />
				</div>
				{/* Contact Button - Current page indicator */}
				<div className="border border-[#e1313d] bg-[#e1313d] text-black px-5 py-1.5 rounded-full text-base font-light tracking-wide">
					{t("nav.contact")}
				</div>
			</header>

			{/* Hero Section */}
			<section className="w-full py-20 px-4 flex justify-center">
				<div className="max-w-5xl w-full mx-auto text-center">
					<h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight mb-6">
						{t("contact.title")}
					</h1>
					<p className="text-gray-300 text-lg md:text-2xl font-light max-w-3xl mx-auto">
						{t("contact.subtitle")}
					</p>
				</div>
			</section>

			{/* Form Section */}
			<section className="w-full flex justify-center items-center px-4 pb-20">
				<div className="w-full max-w-4xl bg-[#e1313d] shadow-xl px-8 md:px-16 py-12">
					<div className="text-center mb-8">
						<h2 className="text-black text-2xl md:text-3xl font-light mb-4">
							{t("contact.formTitle")}
						</h2>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Input
								label={t("contact.fields.fullName")}
								name="fullName"
								register={register}
								registerOptions={{
									required: t("contact.validation.fullNameRequired"),
								}}
								error={errors.fullName}
								placeholder={t("contact.placeholders.fullName")}
							/>

							<Input
								label={t("contact.fields.email")}
								name="email"
								type="email"
								register={register}
								registerOptions={{
									required: t("contact.validation.emailRequired"),
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: t("contact.validation.emailInvalid"),
									},
								}}
								error={errors.email}
								placeholder={t("contact.placeholders.email")}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Input
								label={t("contact.fields.phone")}
								name="phone"
								type="tel"
								register={register}
								error={errors.phone}
								placeholder={t("contact.placeholders.phone")}
							/>

							<Input
								label={t("contact.fields.company")}
								name="company"
								register={register}
								error={errors.company}
								placeholder={t("contact.placeholders.company")}
							/>
						</div>

						<Select
							label={t("contact.fields.serviceType")}
							name="serviceType"
							options={serviceOptions}
							register={register}
							registerOptions={{
								required: t("contact.validation.serviceTypeRequired"),
							}}
							error={errors.serviceType}
							placeholder={t("contact.selectPlaceholder")}
						/>

						<TextArea
							label={t("contact.fields.projectDescription")}
							name="projectDescription"
							register={register}
							registerOptions={{
								required: t("contact.validation.projectDescriptionRequired"),
								minLength: {
									value: 20,
									message: t("contact.validation.projectDescriptionMin"),
								},
							}}
							error={errors.projectDescription}
							placeholder={t("contact.placeholders.projectDescription")}
						/>

						<div className="md:col-span-2 flex justify-center">
							<button
								type="submit"
								disabled={isLoading}
								className="w-full md:w-80 bg-[#191919] text-white text-lg font-semibold uppercase tracking-widest px-10 py-4 transition-colors duration-200 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed">
								{isLoading
									? t("contact.submitting")
									: t("contact.submitButton")}
							</button>
						</div>
					</form>
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="w-full bg-[#191919] py-16 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<h3 className="text-white text-2xl md:text-3xl font-light mb-6">
						{t("contact.directContact.title")}
					</h3>
					<p className="text-gray-300 text-lg font-light mb-8 max-w-2xl mx-auto">
						{t("contact.directContact.description")}
					</p>
					<div className="flex flex-wrap justify-center gap-6">
						<a
							href="mailto:holabravocreatives@gmail.com"
							className="border border-white hover:border-[#e1313d] text-white hover:text-[#e1313d] px-6 py-3 text-base font-light tracking-wide transition-colors flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
								<polyline points="22,6 12,13 2,6" />
							</svg>
							holabravocreatives@gmail.com
						</a>
						<a
							href="https://wa.me/17375870467"
							target="_blank"
							rel="noopener noreferrer"
							className="border border-white hover:border-[#e1313d] text-white hover:text-[#e1313d] px-6 py-3 text-base font-light tracking-wide transition-colors flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
								<path d="M12 2.004A9.994 9.994 0 0 0 2 12c0 1.77.46 3.5 1.33 5.02L2 22l5.09-1.32A9.96 9.96 0 0 0 12 22c5.514 0 10-4.486 10-10s-4.486-9.996-10-9.996zm0 17.996c-1.47 0-2.91-.4-4.15-1.15l-.3-.18-3.02.78.8-2.95-.2-.31A7.96 7.96 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
							</svg>
							WhatsApp
						</a>
						<a
							href="https://www.instagram.com/bravocreatives_"
							target="_blank"
							rel="noopener noreferrer"
							className="border border-white hover:border-[#e1313d] text-white hover:text-[#e1313d] px-6 py-3 text-base font-light tracking-wide transition-colors flex items-center gap-3">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
							Instagram
						</a>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Contact;
