"use client";

import { usePathname } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

const AdminHeader = () => {
  const page = usePathname();
  const header = page.charAt(1).toUpperCase() + page.slice(2)
  return (
    <div className="py-3 w-full bg-white rounded-full flex justify-between px-10">
      <p className="my-auto text-2xl font-bold">{header === "Admin" ? "Dashboard" : header}</p>
      <div className="flex gap-5 my-auto">
        <div className="my-auto rounded-lg cursor-pointer bg-red bg-opacity-10 hover:bg-opacity-20 duration-200 h-10 w-10 flex justify-center items-center">
          <IoNotifications className="text-2xl text-red" />
        </div>
        <div className="my-auto rounded-lg cursor-pointer bg-purple bg-opacity-10 hover:bg-opacity-20 duration-200 h-10 w-10 flex justify-center items-center">
          <FaUser className="text-2xl text-purple" />
        </div>
      </div>
    </div>
  )
}
export default AdminHeader;