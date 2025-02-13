import Button from "@/components/common/buttons/MiniButton"
import AdminNewsCard from "@/components/layouts/admin/AdminNewsCard"
import AdminSubList from "@/components/layouts/admin/AdminSubList"
import DashboardCard from "@/components/layouts/admin/DashboardCard"
import { BiCategory } from "react-icons/bi"
import { FaPenFancy, FaRegNewspaper, FaUsers } from "react-icons/fa"

const AdminDashboard = () => {
  return (
    <div
      className="h-screen w-full flex flex-col gap-5 overflow-y-auto"
    >
      <div className="w-full flex flex-wrap gap-5 flex-row justify-evenly">
        <DashboardCard
          title="News"
          icon={<FaRegNewspaper size={20} />}
        />
        <DashboardCard
          title="Drafts"
          icon={<FaPenFancy size={20} />}
        />
        <DashboardCard
          title="Categories"
          icon={<BiCategory size={20} />}
        />
      </div>
      <div className="flex w-full gap-5">
        <AdminSubList
          button={<Button text="View all" className="border border-white px-4" />}
          title="News"
          content={<div className="flex gap-3 flex-col">
            {[1,2,3,4,5,6,7,8,9,10].map((item, i) => (
              <AdminNewsCard
                key={i}
                title="New Title"
                comments={10}
                date={new Date("2021-09-10")}
              />
            ))}
          </div>}
        />
        <AdminSubList
          button={<Button text="Add New" className="border border-white px-4" />}
          title="Categories"
          content={<p>Content</p>}
        />
      </div>
    </div>
  )
}
export default AdminDashboard