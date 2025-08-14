"use client";

import Logo from "@/ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";
import { BiFolderOpen } from "react-icons/bi"; // Info Portal
import { FiFolder, FiGrid, FiLogOut, FiUsers } from "react-icons/fi"; // Projects, Logout, Employees, Dashboard
import { MdOutlineCalendarToday, MdOutlineMessage } from "react-icons/md"; // Calendar & Messenger
import { PiAirplaneFill } from "react-icons/pi";

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path?: string;
}

interface SidebarClientProps {
  currentPath?: string;
}

export default function SidebarClient({ currentPath }: SidebarClientProps) {
  const pathname = currentPath || usePathname();

  const menuItems: MenuItem[] = [
    {
      icon: <FiGrid className="w-5 h-5" />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FiFolder className="w-5 h-5" />,
      label: "Projects",
      path: "/projects",
    },
    {
      icon: <MdOutlineCalendarToday className="w-5 h-5" />,
      label: "Calendar",
      path: "/calendar",
    },
    {
      icon: <PiAirplaneFill className="w-5 h-5" />,
      label: "Vacations",
      path: "/vacations",
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      label: "Employees",
      path: "/employees",
    },
    {
      icon: <MdOutlineMessage className="w-5 h-5" />,
      label: "Messenger",
      path: "/messenger",
    },
    {
      icon: <BiFolderOpen className="w-5 h-5" />,
      label: "Info Portal",
      path: "/info",
    },
  ];

  return (
    <aside className="w-60 bg-white shadow-md flex flex-col justify-between rounded-2xl">
      {/* Logo Section */}
      <div>
        <div className="p-6 text-xl font-bold">
          <Logo />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive =
              pathname.includes(item.path || "") || pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path || "#"}
                className={`
                  ${
                    isActive
                      ? " font-bold border-r-4 border-blue-500"
                      : " border-r-4 border-transparent"
                  }`}
              >
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors w-[90%] mx-1 ${
                    isActive ? "bg-blue-200" : "hover:bg-gray-200"
                  }`}
                >
                  <div
                    className={
                      isActive ? "text-blue-600" : "text-sidebar-primary"
                    }
                  >
                    {item.icon}
                  </div>
                  <span
                    className={
                      isActive ? "text-blue-600" : "text-sidebar-primary"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-5 border-t border-gray-200">
        <button className="flex items-center gap-3 text-sidebar-primary font-bold transition-colors w-full">
          <FiLogOut className="text-lg" /> Logout
        </button>
      </div>
    </aside>
  );
}
