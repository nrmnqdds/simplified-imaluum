"use client";

import React, { createContext, useEffect } from "react";
import useImaluum from "@/hooks/useImaluum";

export const ImaluumContext = createContext<ImaluumData | undefined>(undefined);

export const ImaluumProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const imaluumData = useImaluum();
  // useEffect(() => {
  //   if (imaluumData) {
  //     console.log("imaluumData from provider", imaluumData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imaluumData]);
  return (
    <ImaluumContext.Provider value={imaluumData}>
      {children}
    </ImaluumContext.Provider>
  );
};
