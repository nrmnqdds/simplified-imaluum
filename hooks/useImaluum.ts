"use client";

import { useEffect, useState } from "react";

const useImaluum = () => {
  const [data, setData] = useState<ImaluumData>();

  async function getStudent() {
    try {
      const res = await fetch("api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const studentData = await res.json();

      return studentData;
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  }

  async function getSchedule() {
    try {
      const res = await fetch("api/v2/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const scheduleData = await res.json();

      return scheduleData;
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
    const cgpadata = await response.json();

    return cgpadata;
  }

  useEffect(() => {
    if (!data) {
      (async function () {
        await Promise.all([getSchedule(), getCGPA(), getStudent()]).then(
          (result) => {
            if (result[0] && result[1] && result[2]) {
              setData({
                ...data,
                // info: result[0],
                courses: result[0],
                cgpa: result[1],
                info: result[2],
              });
            }
          }
        );
      })();
    }
  }, [data]);

  if (data) {
    return data;
  }
};

export default useImaluum;
