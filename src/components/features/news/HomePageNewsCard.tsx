import { News } from "@/models/newsTypes"
import { formatDate } from "@/services/dateFormatter";
import Image from "next/image";
import Link from "next/link";

const HomePageNewsCard = ({ news }: { news: News }) => {
  let { banner, categories, topic, createdAt, id, user } = news;
  const defaultImage = "/images/blog banner.png";

  const blogImage = banner && banner.startsWith('http') ? banner : defaultImage
  
  return (
    <Link href={`/news/${id}`} className="flex justify-between shadow-sm hover:bg-grey hover:bg-opacity-30 duration-200 hover:shadow-md border-grey border-opacity-50">
      <div className="w-full flex flex-col gap-3 p-5 ">
        <div className="flex gap-5 items-center ">
          <p className="line-clamp-1 font-bold text-sm">by: {user.name}</p>
          <p className="min-w-fit font-semibold text-sm">posted: {formatDate(new Date(createdAt))}</p>
        </div>  
        <p className="font-bold text-xl text-black truncate">{topic}</p>    
        {/* <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden line-clamp-2"></p> */}
        <div>
          {categories.map((category) => (
            <span key={category.id} className
            ="text-xs font-semibold text-black bg-grey rounded-full px-4 py-1 mr-2 h-fit">{category.name}</span>
          ))}
        </div>
      </div>
      <div className="my-auto h-[100px] w-[120px] relative mr-5">
        <Image src={blogImage} alt="banner" objectFit="cover" layout="fill" />
      </div>
    </Link>
  )
}
export default HomePageNewsCard