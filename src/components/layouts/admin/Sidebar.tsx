"use client";

import Link from "next/link";
import AdminSideBarButton from "./AdminSideBarButton";
import { usePathname } from "next/navigation";
import { RiDashboardFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { BiCategory, BiUser } from "react-icons/bi";

const Sidebar = () => {
  const pathname = usePathname();
  
  return (
    <div className="h-full overflow-y-auto w-[300px] bg-black text-white flex flex-col rounded-r-2xl py-5 gap-10">
      <div>
        <p className="font-bold text-[30px] text-center">News Page</p>
      </div>
      <div className="flex flex-col gap-1">
        <Link href="/admin">
          <AdminSideBarButton text="Dashboard" active={pathname === "/admin"} icon={<RiDashboardFill size={20} />} />
        </Link>
        <Link href="/admin/news">
          <AdminSideBarButton text="News" active={pathname === "/admin/news"} icon={<FaRegNewspaper size={20} />} />
        </Link>
        <Link href="/admin/news/create">
          <AdminSideBarButton text="Create News" active={pathname === "/admin/news/create"} icon={<IoIosCreate size={20} />} />
        </Link>
        <Link href="/admin/news/profile">
          <AdminSideBarButton text="Profile" active={pathname === "/admin/news/profile"} icon={<BiUser size={20} />} />
        </Link>
        <Link href="/admin/news/category">
          <AdminSideBarButton text="Category" active={pathname === "/admin/news/category"} icon={<BiCategory size={20} />} />
        </Link>
      </div>
    </div>
  )
}
export default Sidebar