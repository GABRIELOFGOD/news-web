import { formatDate } from "@/utils/dateFormatter";

const AdminNewsCard = ({
  title,
  comments,
  date
}: {
  title: string;
  comments: number;
  date: Date;
}) => {
  return (
    <div>
      <div className="flex gap-3 shadow-sm p-2 cursor-pointer">
        <div className="w-1/2">
          <p className="text-lg font-semibold text-gray-800 truncate">{title}</p>
          <p className="font-bold text-gray-400">{comments} comments</p>
        </div>
        <div className="w-1/2">
          <p className="text-right text-gray-400">{formatDate(date)}</p>
        </div>
      </div>
    </div>
  )
}
export default AdminNewsCard;
