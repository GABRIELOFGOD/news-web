"use client";

import Button from "@/components/common/buttons/MiniButton";
import Input from "@/components/common/inputs/Input"
import { useState } from "react"

const AddCategory = () => {
  const [category, setCategory] = useState<string>("");
  
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-xl ">Add Category</p>
      <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Enter Category Name"
          className="w-full h-12"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
        <Button text="Add Category" className="w-full h-12 font-semibold hover:bg-opacity-90 duration-200" />
      </form>
    </div>
  )
}
export default AddCategory;