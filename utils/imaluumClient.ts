"use client";

import { useContext } from "react";
import { ImaluumContext } from "@/context/ImaluumProvider";

const ImaluumClient = () => {
  const context = useContext(ImaluumContext);
  if (context) {
    return context;
  }
};

export default ImaluumClient;
