import { User } from "@/models/userTypes";
import fetchData from "@/services/fetchData";
import { useState } from "react";

export interface ProfileState {
  error: string | null;
  loading: boolean;
  profile: User | null;
}

export const useProfile = () => {
  const [state, setState] = useState<ProfileState>({
    error: null,
    loading: false,
    profile: null,
  });

  const getProfile = async () => {
    setState({ ...state, loading: true });
    try {
      const response = await fetchData.get({
        path: "users/profile",
        withHeaders: true,
      });

      setState({ ...state, profile: response.user, loading: false });
    } catch (error) {
      setState({ ...state, error: (error as Error).message, loading: false });
    }
  };

  return { ...state, getProfile, setState };
};