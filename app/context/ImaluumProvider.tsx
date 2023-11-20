import React, { createContext, useEffect, useState } from "react";
import Image from "next/image";
import LOGO from "@/public/logo-landing-page.png";

export const ImaluumContext = createContext<ImaluumData | undefined>(undefined);

const fetchData = async (url: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

export const ImaluumProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<ImaluumData>();

  const getStudent = () => fetchData("/api/student");
  const getSchedule = () => fetchData("/api/v2/schedule");
  const getResult = () => fetchData("/api/result");

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [scheduleData, resultData, studentData] = await Promise.all([
          getSchedule(),
          getResult(),
          getStudent(),
        ]);

        setData({
          courses: scheduleData,
          results: resultData,
          info: studentData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!data) {
      fetchDataAsync();
    }
  }, [data]);

  return data?.courses && data?.results && data?.info ? (
    <ImaluumContext.Provider value={data}>{children}</ImaluumContext.Provider>
  ) : (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-75 transition-opacity flex items-center justify-center">
      <div
        role="status"
        className="flex flex-col gap-5 items-center justify-center"
      >
        <Image
          src={LOGO}
          alt="i-Ma'luum Logo"
          width={200}
          height={200}
          className="animate-spin"
        />
        <p className="text-zinc-100 text-2xl">Scraping your IC number...</p>
      </div>
    </div>
  );
};
