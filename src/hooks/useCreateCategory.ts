"use client";

import { CategoryCreate } from "@/models/categoryTypes";
import fetchData from "@/services/fetchData";
import { useState } from "react"

export interface CreateCategoryState {
  loading: boolean;
  error: string | null;
}

export const useCreateCategory = () => {
  const [state, setState] = useState<CreateCategoryState>({
    loading: false,
    error: null
  });

  const createCategory = async (category: CategoryCreate) => {
    setState({ ...state, loading: true });
    const response = await fetchData.post({
      path: "categories",
      data: category,
      withHeaders: true,
    });

    setState({ ...state, loading: false });
    return response
  }

  return { ...state, createCategory, setState };
}