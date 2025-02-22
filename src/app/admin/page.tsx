"use client";

import Button from "@/components/common/buttons/MiniButton"
import AdminNewsCard from "@/components/layouts/admin/AdminNewsCard"
import AdminSubList from "@/components/layouts/admin/AdminSubList"
import DashboardCard from "@/components/layouts/admin/DashboardCard"
import DashboardCategory from "@/components/layouts/admin/DashboardCategory";
import ButtonLoader from "@/components/layouts/category/widget/ButtonLoader";
import { useEditorContext } from "@/context/EditorContext"
import { useGetCategory } from "@/hooks/useGetCategory"
import { useGetNews } from "@/hooks/useGetNews";
import { useRouter } from "next/navigation";
import { BiCategory } from "react-icons/bi"
import { FaPenFancy, FaRegNewspaper } from "react-icons/fa"
import { toast } from "sonner";

const AdminDashboard = () => {
  const { loading, error } = useGetCategory();
  const { categories } = useEditorContext();
  const { data, loading: loadNews } = useGetNews();
  const router = useRouter();

  if (error) toast.error(error);
  
  return (
    <div
      className="h-screen w-full flex flex-col gap-5 overflow-y-auto"
    >
      <div className="w-full flex flex-wrap gap-5 flex-row justify-evenly">
        <DashboardCard
          title="News"
          icon={<FaRegNewspaper size={20} />}
          value={data.length}
        />
        <DashboardCard
          title="Drafts"
          icon={<FaPenFancy size={20} />}
          value={data.filter((item) => item.status === "draft").length}
        />
        <DashboardCard
          title="Categories"
          icon={<BiCategory size={20} />}
          value={categories.length}
        />
      </div>
      <div className="flex w-full gap-5">
        <AdminSubList
          button={<Button text="View all" className="border border-white px-4" onClick={() => router.push("/admin/news")} />}
          title="News"
          content={loading ? (<div className="flex w-full h-full justify-center items-center"><ButtonLoader color="white" /></div>) : (data === null || data.length < 1 ? <div className="flex w-full h-full justify-center items-center"><p className="text-xl font-semibold text-dark-grey text-center">No News Posted Yet!</p></div> : <div className="flex gap-3 flex-col">
            {data.slice(0, 5).map((item, i) => (
              <AdminNewsCard
                key={i}
                title={item.topic}
                comments={item.categories.length}
                date={new Date(item.createdAt)}
                state={item.status}
              />
            ))}
          </div>)}
        />
        <AdminSubList
          button={<Button text="Add New" className="border border-white px-4" onClick={() => router.push("/admin/category")} />}
          title="Categories"
          content={loadNews ? (<div className="flex w-full h-full justify-center items-center"><ButtonLoader color="white" /></div>) : (categories === null || categories.length < 1 ? <div className="flex w-full h-full justify-center items-center">
            <p className="text-xl font-semibold text-dark-grey text-center">No News Category Added Yet!</p>
          </div> : <DashboardCategory categories={categories} />)}
        />
      </div>
    </div>
  )
}
export default AdminDashboard