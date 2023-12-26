"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}<ReactQueryDevtools initialIsOpen={false} /></QueryClientProvider>
  );
};
