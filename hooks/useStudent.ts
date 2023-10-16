"use client";

import { useEffect, useState } from "react";

const useStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    imageURL: "",
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("api/student", {
        method: "GET",
      });
      const data = await res.json();
      setStudent(data);
    })();
  }, []);

  return { student };
};

export default useStudent;
