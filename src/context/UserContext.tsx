/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCurrentUser } from "@/services/AuthServices";
import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UserProviderValues {
  user: any | null;
  isLoading: boolean;
  refetchUser: () => void;
}

const UserContext = createContext<UserProviderValues | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isFetching, refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading: isFetching,
        refetchUser: () => {
          refetch();
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export default UserProvider;
