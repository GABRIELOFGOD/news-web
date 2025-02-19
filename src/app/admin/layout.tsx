// "use client";

// import AdminHeader from "@/components/features/admin/AdminHeader"
// import Sidebar from "@/components/layouts/admin/Sidebar"
// import { useGlobalContext } from "@/context/GlobalContext";
// import { useProfile } from "@/hooks/useProfile";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react"

// const AdminLayout = ({children}: {children: ReactNode}) => {
//   const router = useRouter();
//   const { isLoggedIn } = useGlobalContext();
//   const { error, loading, getProfile, setState } = useProfile();

//   const authenticateUser = async () => {
//     setState({ error: null, loading: true, profile: null });
//     if (!isLoggedIn) {
//       router.push("/login");
//     } else {
//       const profile = await getProfile();
//       console.log(profile);
//     }
//   }

//   useEffect(() => {
//     authenticateUser();
//   }, [isLoggedIn]);

//   if (error) {
//     localStorage.removeItem("token");
//     router.push("/login");
//   }

//   return (
//     <div>
//       <div className="h-screen w-full flex bg-grey">
//         {/* <AnimationWrapper> */}
//           <Sidebar />
//         {/* </AnimationWrapper> */}
//         <div className="flex flex-col w-screen">
//           <div className="bg-grey w-full h-full p-10 flex flex-col gap-5">
//             {/* <AnimationWrapper> */}
//               <AdminHeader  />
//             {/* </AnimationWrapper> */}
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default AdminLayout

"use client";

import LoadingSCreen from "@/components/common/pages/LoadingSCreen";
import AdminHeader from "@/components/features/admin/AdminHeader";
import Sidebar from "@/components/layouts/admin/Sidebar";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useGlobalContext();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, loading]);

  if (loading) {
    return <LoadingSCreen />
  }

  return (
    <div className="h-screen w-full flex bg-grey">
      <Sidebar />
      <div className="flex flex-col w-screen">
        <div className="bg-grey w-full h-full p-10 flex flex-col gap-5">
          <AdminHeader />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
