"use client";

import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import BookingTable from "./components/BookingTable";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

  const router = useRouter();
    const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/Logo.png" width={120} height={60} alt="Logo" />
          </div>
          <button
            onClick={handleLogout} 
            className="flex border-[1.5px] rounded-full px-3 md:px-5 md:py-3 py-2 items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <span>Logout</span>
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <BookingTable />
    </div>
  );
}
