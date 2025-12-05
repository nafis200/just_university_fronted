"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "@/context/UserContext";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
