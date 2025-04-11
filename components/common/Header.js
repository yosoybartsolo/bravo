/* eslint-disable @next/next/no-img-element */
"use client";
import config from "@/config";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navItems = [
	{ label: "Faqs", href: "/faqs" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Contact", href: "/contact" },
];

const Header = () => {
	const { data: session } = useSession();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: "/" });
	};

	return (
		<div className="navbar bg-white shadow-sm border-b border-yellow-100">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost text-gray-700 lg:hidden hover:bg-yellow-50">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-yellow-100">
						{navItems.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="text-gray-700 hover:text-amber-600 hover:bg-yellow-50">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<Link
					className="btn btn-ghost text-xl text-amber-600 font-bold hover:bg-yellow-50"
					href="/">
					{config.appName}
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{navItems.map((item) => (
						<li key={item.href}>
							<Link
								href={item.href}
								className="text-gray-700 hover:text-amber-600 hover:bg-yellow-50">
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="navbar-end">
				{session ? (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar ring-2 ring-yellow-200 hover:ring-amber-300">
							<div className="w-10 rounded-full">
								<img
									alt="User avatar"
									src={
										session.user?.image ||
										`https://api.dicebear.com/9.x/initials/svg?seed=${session.user?.name}?size=40`
									}
									width={40}
									height={40}
									className="rounded-full"
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-yellow-100">
							<li className="menu-title px-4 py-2 bg-gradient-to-r from-yellow-50 to-white">
								<span className="font-semibold text-amber-600">
									Welcome, {session.user?.name}
								</span>
							</li>

							{session.user?.role === "admin" && (
								<li>
									<Link
										href="/admin/dashboard"
										className="text-gray-700 hover:text-amber-600 hover:bg-yellow-50">
										Admin Dashboard
									</Link>
								</li>
							)}

							<li>
								<Link
									href="/dashboard"
									className="text-gray-700 hover:text-amber-600 hover:bg-yellow-50">
									Dashboard
								</Link>
							</li>

							<li>
								<button
									onClick={handleSignOut}
									className="text-gray-700 hover:text-amber-600 hover:bg-yellow-50">
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				) : (
					<Link
						className="btn bg-gradient-to-r from-yellow-400 to-amber-500 text-white border-0 hover:shadow-md"
						href={config.auth.loginUrl}>
						Sign In
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
