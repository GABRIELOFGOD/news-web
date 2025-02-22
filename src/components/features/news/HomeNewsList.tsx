"use client";

import ButtonLoader from "@/components/layouts/category/widget/ButtonLoader";
import { useGetNews } from "@/hooks/useGetNews";
import { toast } from "sonner";
import HomePageNewsCard from "./HomePageNewsCard";
import AnimationWrapper from "@/components/common/wrappers/AnimationWrapper";

const HomeNewsList = () => {
  const { data, loading, error } = useGetNews();

  if (error) toast.error(error);
  
  return (
    <div className="w-full md:w-[700px] py-10 mx-auto">
      {loading  ?
        (<div className="flex justify-center items-center h-96 w-full">
          <ButtonLoader color="black" />
        </div>) :
        (<div className="w-full flex flex-col gap-5">
          {data?.filter((newsItem) => newsItem.status === "published").map((news) => (
            <AnimationWrapper key={news.id} transition={{ duration: 1 }}>
              <HomePageNewsCard news={news} />
            </AnimationWrapper>
          ))}
        </div>)}
    </div>
  )
}
export default HomeNewsList