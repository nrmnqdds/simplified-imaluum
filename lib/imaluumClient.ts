"use client";

import { ImaluumContext } from "@/context/ImaluumProvider";
import { useContext } from "react";

const ImaluumClient = () => {
  const context = useContext(ImaluumContext);
  if (context) {
    return context;
  }
};

export default ImaluumClient;
