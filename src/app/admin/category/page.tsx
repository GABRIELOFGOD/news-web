import AddCategory from "@/components/layouts/category/AddCategory"
import CategoryCard from "@/components/layouts/category/CategoryCard"

const Category = () => {
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-[3] flex flex-col gap-5">
        <p className="text-2xl font-semibold">News Categories</p>
        {/* <p className="text-dark-grey"></p> */}
        <div className="flex flex-col gap-2 w-full">
          {[1,2,3,4,5].map((item, i) => (
            <CategoryCard key={i} text="Category" />
          ))}
        </div>
      </div>
      <div className="flex-[2] flex flex-col gap-3">
        <p className="text-dark-grey">Add category</p>
        <AddCategory />
      </div>
    </div>
  )
}
export default Category