"use client";

import { useState } from "react"

export interface CreateNewsState {
  loading: boolean;
  error: null | string;
  message: null | string;
}

export const useCreateNews = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    message: null,
  });
}