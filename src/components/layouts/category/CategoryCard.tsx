import Button from "@/components/common/buttons/MiniButton"
import { Category } from "@/models/categoryTypes"
import { BiEdit } from "react-icons/bi"

const  CategoryCard = ({category}:{category: Category}) => {
  return (
    <div className="flex justify-between bg-grey shadow-md rounded-md py-2 px-4 w-full border border-dark-grey border-opacity-20"> 
      <p className="my-auto font-[500] capitalize truncate">{category.name}</p>
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