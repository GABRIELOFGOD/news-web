"use client";

import Button from "@/components/common/buttons/MiniButton";
import Input from "@/components/common/inputs/Input"
import { useCreateCategory } from "@/hooks/useCreateCategory";
import { CategoryCreate } from "@/models/categoryTypes";
import { FormEvent, useState } from "react"
import ButtonLoader from "./widget/ButtonLoader";
import { toast } from "sonner";
import { useEditorContext } from "@/context/EditorContext";

const AddCategory = () => {
  const [state, setState] = useState<CategoryCreate>({
    name: "",
    description: ""
  });
  const { categories, setCategories } = useEditorContext();

  const { createCategory, error, loading, setState: setCategoryState } = useCreateCategory();
  
  const handleSubmitCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategoryState({
      error: null,
      loading: true,
    });

    const createCategoryResponse = await createCategory(state);
    if (createCategoryResponse.success === true) {
      setState({ name: "", description: "" });
      toast.success(createCategoryResponse.message, {
        position: "top-right",
      });
      setCategories([...categories, createCategoryResponse.category]);
    };
  };

  if (error) toast.error(error);
  
  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-xl ">Add Category</p>
      <form onSubmit={handleSubmitCategory} className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Enter Category Name"
          className="w-full h-12"
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <textarea
          className="w-full bg-transparent border outline-black h-20 resize-none rounded-md p-3"
          placeholder="Category Description (Optional)"
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        ></textarea>
        <Button
          text={loading ? <ButtonLoader /> : "Add Category"}
          className="w-full h-12 font-semibold hover:bg-opacity-90 duration-200 disabled:bg-dark-grey disabled:cursor-not-allowed"
          disabled={state.name.length === 0 || loading}
        />
      </form>
    </div>
  )
}
export default AddCategory;