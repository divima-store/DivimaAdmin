"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutConfirmation from "@/components/LogoutConfirmation";
import {
  BarChartIcon,
  BoxIcon,
  Package2Icon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCloseLogoutConfirm = () => {
    setShowLogoutConfirm(false);
  };

  const pathname = usePathname();

  const isActive = (route) => {
    return pathname === route;
  };

  return (
    <div className="hidden border-r bg-white lg:block dark:bg-gray-800/40 fixed top-0 left-0 h-full w-[280px] z-10">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6 text-black" />
            <span className="text-black">Divima</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/") ? "bg-gray-200 text-gray-900" : "text-gray-500"
              } hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50`}
              href="/"
            >
              <BarChartIcon className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/orders")
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500"
              } hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              href="/orders"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              Orders
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/products")
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500"
              } hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              href="/products"
            >
              <BoxIcon className="h-4 w-4" />
              Products
            </Link>
            <Link
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/customers")
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-500"
              } hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              href="/customers"
            >
              <UsersIcon className="h-4 w-4" />
              Customers
            </Link>
            <br></br>
            <Button onClick={handleLogoutClick}>Logout</Button>
          </nav>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmation onClose={handleCloseLogoutConfirm} />
      )}
    </div>
  );
}
