import type { Metadata } from "next";
import Dashboard from "./dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Simplified i-Ma'luum",
  description: "A simplified version of i-Ma'luum for students.",
};

const Page = () => {
  return <Dashboard />;
};

export default Page;
