"use client";

import { BASE_URL } from "@/utils/constants";
import { useState } from "react";

export const useUploadImage = () => {

  interface UploadImageState {
    // data: string;
    loading: boolean;
    error: null | string;
  }

  const [state, setState] = useState<UploadImageState>({
    loading: false,
    error: null,
  });

  const uploadImageByFile = async (file: File) => {
    setState({ error: null, loading: true });
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${BASE_URL}/news/upload`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result.url;
      // setState({ data: result.url, loading: false, error: null });
    } catch (error) {
      setState({ loading: false, error: (error as Error).message });
    }
  };

  return { ...state, uploadImageByFile };
};