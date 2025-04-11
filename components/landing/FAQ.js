"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
	{
		question: "What do I get exactly?",
		answer: <div className="space-y-2 leading-relaxed">Loreum Ipseum</div>,
	},
	{
		question: "Can I get a refund?",
		answer: (
			<p>
				Yes! You can request a refund within 7 days of your purchase. Reach out
				by email.
			</p>
		),
	},
	{
		question: "I have another question",
		answer: (
			<div className="space-y-2 leading-relaxed">Cool, contact us by email</div>
		),
	},
];

const Item = ({ item }) => {
	const accordion = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<li>
			<button
				className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-yellow-200"
				onClick={(e) => {
					e.preventDefault();
					setIsOpen(!isOpen);
				}}
				aria-expanded={isOpen}>
				<span
					className={`flex-1 text-gray-700 ${isOpen ? "text-amber-600" : ""}`}>
					{item?.question}
				</span>
				<svg
					className={`flex-shrink-0 w-4 h-4 ml-auto fill-current ${
						isOpen ? "text-amber-500" : "text-gray-500"
					}`}
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg">
					<rect
						y="7"
						width="16"
						height="2"
						rx="1"
						className={`transform origin-center transition duration-200 ease-out ${
							isOpen && "rotate-180"
						}`}
					/>
					<rect
						y="7"
						width="16"
						height="2"
						rx="1"
						className={`transform origin-center rotate-90 transition duration-200 ease-out ${
							isOpen && "rotate-180 hidden"
						}`}
					/>
				</svg>
			</button>

			<div
				ref={accordion}
				className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
				style={
					isOpen
						? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
						: { maxHeight: 0, opacity: 0 }
				}>
				<div className="pb-5 leading-relaxed text-gray-600">{item?.answer}</div>
			</div>
		</li>
	);
};

const FAQ = () => {
	return (
		<section className="bg-gradient-to-br from-yellow-50 to-white" id="faq">
			<div className="py-24 px-8 max-w-3xl mx-auto flex flex-col gap-12">
				<div className="flex flex-col text-left">
					<p className="inline-block font-semibold text-amber-600 mb-4">FAQ</p>
					<p className="sm:text-4xl text-3xl font-extrabold text-gray-800">
						Frequently Asked Questions
					</p>
				</div>

				<ul className="w-full">
					{faqList.map((item, i) => (
						<Item key={i} item={item} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default FAQ;
