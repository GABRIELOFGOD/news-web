import Button from "@/components/common/buttons/MiniButton"
import { BiEdit } from "react-icons/bi"

const  CategoryCard = ({ text }: {text: string}) => {
  return (
    <div className="flex justify-between bg-grey shadow-sm rounded-md py-2 px-4 w-full"> 
      <p className="my-auto font-[500]">{text}</p>
      <div className="flex gap-5 my-auto">
        <button className="flex gap-2 my-auto">
          <BiEdit className="my-auto" />
          <p className="my-auto">Edit</p>
        </button>
        <Button text="Remove" className="h-fit" />
      </div>
    </div>
  )
}
export default  CategoryCard