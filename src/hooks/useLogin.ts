"use client";

import fetchData from "@/services/fetchData";
import { useState } from "react";

export interface LoginState {
  loading: boolean;
  error: string | null;
}

export const useLogin = () => {
  const [state, setState] = useState<LoginState>({
    loading: false,
    error: null,
  });

  const login = async (email: string, password: string) => {
    setState({ loading: true, error: null });
    try {
      const response = await fetchData.post({
        path: "users/login",
        data: { email, password },
        withHeaders: false,
      });
      return response;
    } catch (error) {
      setState({ loading: false, error: (error as Error).message });
      return null;
    }
  };

  return { ...state, login, setState };
};
