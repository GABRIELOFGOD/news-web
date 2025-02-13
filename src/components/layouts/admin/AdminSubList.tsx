import { ReactNode } from "react";

const AdminSubList = ({ title, button, content }: {
  title: string;
  button: ReactNode;
  content: ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full h-full">
      <div className="w-full bg-black rounded-t-lg text-white py-3 flex justify-between px-4">
        <p className="font-semibold text-2xl">{title}</p>
        {button}
      </div>
      <div className="p-4 h-[400px] overflow-y-auto">
        {content}
      </div>
    </div>
  )
}
export default AdminSubList