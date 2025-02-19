"use client";

import AddCategory from "@/components/layouts/category/AddCategory"
import CategoryCard from "@/components/layouts/category/CategoryCard"
import Spinner from "react-spinkit"
import { useGetCategory } from "@/hooks/useGetCategory";
import { toast } from "sonner";
import { useEditorContext } from "@/context/EditorContext";

const Category = () => {
  const { loading, error } = useGetCategory();
  const { categories } = useEditorContext();

  if (error) toast.error(error);
  
  return (
    <div className="flex flex-col md:flex-row gap-5 h-full overflow-y-auto">
      <div className="w-full flex-[3]">

        {loading ? (<div className="h-[300px] w-full flex items-center justify-center">
          <Spinner name="circle" />
        </div>) : (categories.length ? <div className=" flex flex-col gap-5">
          <p className="text-2xl font-semibold">News Categories</p>
          {/* <p className="text-dark-grey"></p> */}
          <div className="flex flex-col gap-2 w-full">
            {categories.map((item, i) => (
              <CategoryCard key={i} category={item} />
            ))}
          </div>
        </div> : <div className="text-dark-grey font-bold text-2xl text-center h-[300px] w-full">No Category!</div>)}
      </div>
      <div className="flex-[2] flex flex-col gap-3">
        <p className="text-dark-grey">Add category</p>
        <AddCategory />
      </div>
    </div>
  )
}
export default Category