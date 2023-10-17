"use client";

import { useEffect, useState } from "react";

const useStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("api/student", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setStudent(data);
        });
      setLoading(false);
    })();
  }, []);

  if (!loading) {
    return student;
  }
};

export default useStudent;
