import { formatDate } from "@/services/dateFormatter";

const AdminNewsCard = ({
  title,
  comments,
  date,
  state
}: {
  title: string;
  comments: number;
  date: Date;
  state: "draft" | "published";
}) => {
  return (
    <div>
      <div className="flex gap-3 shadow-sm p-2 cursor-pointer hover:bg-grey duration-200 rounded-md">
        <div className="w-1/2">
          <p className="text-lg font-semibold text-gray-800 truncate">{title}</p>
          <p className="font-bold text-gray-400">{comments} {comments === 1 ? "Category" : "Categories"}</p>
        </div>
        <div className="w-1/2">
          <p className="text-right text-gray-400">{formatDate(date)}</p>
          <p className="text-right text-dark-grey text-sm font-semibold">{state}</p>
        </div>
      </div>
    </div>
  )
}
export default AdminNewsCard;
