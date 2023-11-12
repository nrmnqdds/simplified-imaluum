"use client";

import { useEffect, useState } from "react";

const useStudent = () => {
  const [student, setStudent] = useState<StudentInfo>();

  useEffect(() => {
    (async function () {
      await fetch("/api/student", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setStudent(data));
    })();
  }, []);

  if (student) {
    return student;
  }
};

export default useStudent;
