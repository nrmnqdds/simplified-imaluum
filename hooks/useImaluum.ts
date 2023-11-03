"use client";

import { useEffect, useState } from "react";

const useImaluum = () => {
  const [data, setData] = useState<ImaluumData>();

  async function getStudent() {
    try {
      const res = await fetch("api/student", {
        method: "POST",
      });
      const studentData = await res.json();
      setData((prevData) => ({
        ...prevData,
        info: studentData,
      }));
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  async function getSchedule() {
    try {
      const res = await fetch("api/schedule2", {
        method: "POST",
      });
      const scheduleData = await res.json();
      setData((prevData) => ({
        ...prevData,
        courses: scheduleData,
      }));
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    }
  }

  async function getCGPA() {
    const response = await fetch(`api/getCGPA`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData((prevData) => ({
      ...prevData,
      cgpa: data,
    }));
  }

  useEffect(() => {
    if (!data) {
      (async function () {
        // await getStudent();
        await getSchedule();
        await getCGPA();
      })();
    }
  }, [data]);

  return data;
};

export default useImaluum;
