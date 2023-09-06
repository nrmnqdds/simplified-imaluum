"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define a type for a single cookie
type Cookie = {
  name: string;
  value: string;
};

// Define a type for an array of cookies
type Cookies = Cookie[];

// Define a type for your context value
type CookiesContextValue = {
  cookies: Cookies;
  setCookies: (cookies: Cookies) => void;
};

// Create a context to store cookies
const CookiesContext = createContext<CookiesContextValue | undefined>(
  undefined
);

// Create a provider to store cookies
export const CookiesProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookies] = useState<Cookies>([]);

  return (
    <CookiesContext.Provider value={{ cookies, setCookies }}>
      {children}
    </CookiesContext.Provider>
  );
};

export const useCookiesProvider = () => {
  const context = useContext(CookiesContext);
  if (context === undefined) {
    throw new Error("useCookiesProvider must be used within a CookiesProvider");
  }
  return context;
};
