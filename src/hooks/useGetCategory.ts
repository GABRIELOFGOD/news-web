"use client";

import { useEditorContext } from "@/context/EditorContext";
import { Category } from "@/models/categoryTypes";
import fetchData from "@/services/fetchData";
import { useEffect, useState } from "react"

export interface GetCategoryState {
  loading: boolean;
  error: string | null;
};

export const useGetCategory = () => {
  const [state, setState] = useState<GetCategoryState>({
    loading: false,
    error: null,
  });

  const { setCategories } = useEditorContext();

  const fetchCategory = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await fetchData.get({
        path: "categories"
      });
      const data = response.categories as Category[];
      setCategories(data);
      setState({ ...state, loading: false });
    } catch (error) {
      setState({ ...state, loading: false, error: (error as Error).message });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return state;
  
}