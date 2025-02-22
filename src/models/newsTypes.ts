import { Category } from "./categoryTypes";
import { User } from "./userTypes";

export  enum NewsStatus {
  DRAFT= "draft",
  PUBLISHED= "published"
}

export interface News {
  id: string;
  topic: string;
  content: string;
  status: NewsStatus;
  banner: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  categories: Category[];
}
