"use client";

import Button from "@/components/common/buttons/MiniButton";
import { News } from "@/models/newsTypes"
import { formatDateWithTime } from "@/services/dateFormatter";
import Image from "next/image"
import { BiEditAlt } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

const AdminNewsPreviewCard = ({data}: {data: News}) => {
  const defaultImage = "/images/blog banner.png";

  const blogImage = data.banner && data.banner.startsWith('http') ? data.banner : defaultImage
  
  return (
    <div className="shadow-md rounded-lg bg-white p-4 w-full md:w-[350px] hover:shadow-xl transition duration-300">
      <div className="relative aspect-16-9 bg-grey rounded-md overflow-hidden h-[200px]">
        <Image src={blogImage} alt="banner" objectFit="cover" layout="fill" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 my-auto w-full justify-start truncate">
          <p className="text-xl font-bold truncate"><span>Topic: </span>{data.topic}</p>
          <p className="text-sm text-dark-grey truncate"><span className="font-bold text-black">Posted:</span> {formatDateWithTime(new Date(data.createdAt))}</p>
        </div>
        <div className="flex gap-5 my-auto justify-end">
          <Button
            text={<BiEditAlt size={20} color="black" />}
            className="my-auto h-fit bg-transparent text-black"
          />
          <Button
            text={<BsEye size={20} />}
            className="my-auto h-fit"
          />
        </div>
      </div>
    </div>
  )
}
export default AdminNewsPreviewCard