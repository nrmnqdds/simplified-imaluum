"use client";

import { useEffect, useState } from "react";

const useStudent = () => {
  const [student, setStudent] = useState<StudentInfo>();

  useEffect(() => {
    (async function () {
      const res = await fetch("/api/student", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => setStudent(data));
    })();
  }, []);

  return student;
};

export default useStudent;
