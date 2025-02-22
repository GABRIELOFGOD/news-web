"use client";
import { useRouter } from "next/navigation"

import { Category } from "@/models/categoryTypes"
import CategoryCard from "../category/CategoryCard"

const DashboardCategory = ({categories}: {categories: Category[]}) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-2 w-full">
      {categories.slice(0, 5).map((item, i) => (
        <CategoryCard key={i} category={item} />
      ))}
      {categories.length > 5 && <div className="flex w-full justify-end py-1">
        <span className="hover:underline cursor-pointer" onClick={() => router.push("/admin/category")}>More...</span>
      </div>}
    </div>
  )
}
export default DashboardCategory