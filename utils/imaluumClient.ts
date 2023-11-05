"use client";

import { useContext } from "react";
import { ImaluumContext } from "@/app/context/ImaluumProvider";

const ImaluumClient = () => {
  const context = useContext(ImaluumContext);
  if (context) {
    return context;
  }
};

export default ImaluumClient;
