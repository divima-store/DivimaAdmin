"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutConfirmation({ onClose }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setIsLoggingOut(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-xl text-gray-900 font-semibold mb-4">
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} disabled={isLoggingOut}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            className="bg-red-500 text-white"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
