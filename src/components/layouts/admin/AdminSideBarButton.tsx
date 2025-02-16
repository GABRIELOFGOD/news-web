import { ReactNode } from "react";

const AdminSideBarButton = ({
  active,
  text,
  className,
  icon
}: {
  active: boolean,
  text: string,
  className?: string,
  icon: ReactNode
}) => {
  return (
    <div className={`font-semibold duration-200 w-full py-3 px-5 text-xl rounded-l-full ${active ? "bg-grey text-black font-bold hover:bg-grey hover:text-black" : "hover:bg-dark-grey"} ${className}`}>
      <div className="flex items-center gap-3">
        {icon}
        <p>{text}</p>
      </div>
    </div>
  )
}
export default AdminSideBarButton;