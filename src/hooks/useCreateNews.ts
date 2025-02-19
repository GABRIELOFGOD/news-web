"use client";

import { BlogStructure } from "@/context/EditorContext";
import { BASE_URL } from "@/utils/constants";
import { useState } from "react"

export interface CreateNewsState {
  loading: boolean;
  error: null | string;
  message: null | string;
}

export const useCreateNews = () => {
  const [state, setState] = useState<CreateNewsState>({
    loading: false,
    error: null,
    message: null,
  });

  const postNews = async ({ title, desc, content, tags, banner }: BlogStructure) => {
    try {
      setState({ ...state, error: null, loading: true });
      const request = await fetch(`${BASE_URL}/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ "topic": title, "description": desc, content, tags, banner }),
      });

      const response = await request.json();
      if (!request.ok) throw new Error(response.message);

      if (response.success !== true) throw new Error(response.message);

      setState({ ...state, message: response.message, loading: false });

    } catch (error) {
      setState({ ...state, error: (error as Error).message });
    }
  }

  return { ...state, postNews };
}