"use client";

import Input from "@/components/common/inputs/Input";
import AdminNewsPreviewCard from "@/components/layouts/admin/AdminNewsPreviewCard"
import ButtonLoader from "@/components/layouts/category/widget/ButtonLoader";
import { useGetNews } from "@/hooks/useGetNews"
import { News } from "@/models/newsTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminNewsPage = () => {
  const [news, setNews] = useState<News[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  
  const { data, error, loading, message } = useGetNews();

  useEffect(() => {
    if (data) {
      setNews(data);
    }
  }, [data]);

  if (error) toast.error(error);

  if (message) toast.success(message);
  
  return (
    <div className="h-full overflow-y-auto">
      { loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <ButtonLoader color="black" />
        </div>
      ) : (<div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <p className="text-2xl font-bold capitalize my-auto">All availble news</p>
          <Input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search news"
            className="h-10 my-auto"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {news.map((item) => (
            <AdminNewsPreviewCard key={item.id} data={item} />
          ))}
        </div>
      </div>)}
    </div>
  )
}
export default AdminNewsPage