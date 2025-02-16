import AnimationWrapper from "@/components/common/wrappers/AnimationWrapper"
import AdminHeader from "@/components/features/admin/AdminHeader"
import Sidebar from "@/components/layouts/admin/Sidebar"
import { ReactNode } from "react"

const AdminLayout = ({children}: {children: ReactNode}) => {
  
  return (
    <div>
      <div className="h-screen w-full flex bg-grey">
        {/* <AnimationWrapper> */}
          <Sidebar />
        {/* </AnimationWrapper> */}
        <div className="flex flex-col w-screen">
          <div className="bg-grey w-full h-full p-10 flex flex-col gap-5">
            {/* <AnimationWrapper> */}
              <AdminHeader  />
            {/* </AnimationWrapper> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminLayout