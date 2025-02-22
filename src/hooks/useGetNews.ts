"use client";

import { News } from "@/models/newsTypes";
import fetchData from "@/services/fetchData"
import { useEffect, useState } from "react";

export interface NewsState {
  loading: boolean;
  error: null | string;
  data: News[];
  message: string | null;
}

export const useGetNews = () => {
  const [state, setState] = useState<NewsState>({
    loading: true,
    error: null,
    data: [],
    message: null
  });
  
  const getNews = async () => {
    try {
      const response = await fetchData.get({
        path: "news"
      });
      
      if (response.success === true){
        setState({
          error: null,
          data: response.news,
          message: response.message,
          loading: false
        });
        return response;
      }
    } catch (error) {
      setState({
        loading: false,
        error: (error as Error).message,
        data: [],
        message: null
      });
    }
  }

  useEffect(() => {
    getNews();
  }, []);

  return state;
  
}