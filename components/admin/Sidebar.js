"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

// Admin sidebar navigation options
const sidebarOptions = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },

  {
    href: "/admin/dashboard/orders",
    label: "Órdenes",
    icon: ShoppingBagIcon,
  },
  {
    href: "/admin/dashboard/users",
    label: "Usuarios",
    icon: UsersIcon,
  },
  {
    href: "/admin/dashboard/configuration",
    label: "Configuración",
    icon: CogIcon,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
      {sidebarOptions.map((option) => {
        const isActive =
          option.href === "/admin/dashboard"
            ? pathname === "/admin/dashboard"
            : pathname.startsWith(`${option.href}/`) ||
              pathname === option.href;

        return (
          <li key={option.href}>
            <Link
              href={option.href}
              className={isActive ? "active font-bold bg-base-300" : ""}
            >
              <option.icon className="w-5 h-5" />
              {option.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
