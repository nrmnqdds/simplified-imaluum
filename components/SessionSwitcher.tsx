/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useTransition } from "react";
import React from "react";
import { redirect } from "next/navigation";

const predefinedColors = [
  "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
  "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
  "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
  "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
  "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
  "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
  "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
  "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
  "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
];

export default function SessionSwitcher({ setEvents }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  const [sessionsList, setSessionsList] = useState({ sessionList: [] });
  const [session, setSession] = useState<string>("");

  useEffect(() => {
    (async function () {
      const response = await fetch(`api/session`, {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();
        setSessionsList(responseData);
        if (responseData.sessionList.length >= 1) {
          setSession(responseData.sessionList[0].sessionQuery);
        }
      } else {
        redirect("/");
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`api/schedule`, {
          method: "POST",
          body: JSON.stringify({ session }),
        });

        if (response.ok) {
          const responseData = await response.json();
          // console.log("responseData", responseData);

          if (responseData) {
            const titleToColorMap = {}; // Map event titles to colors

            const mappedEvents = responseData.schedule.map(
              (event: any, index: number) => {
                const title = event.courseCode;
                let color = titleToColorMap[title];

                if (!color) {
                  // If no color assigned for this title, find an available color
                  const availableColors = predefinedColors.filter(
                    (c) => !Object.values(titleToColorMap).includes(c)
                  );

                  if (availableColors.length > 0) {
                    // If there are available colors, pick one randomly
                    const randomColorIndex = Math.floor(
                      Math.random() * availableColors.length
                    );
                    color = availableColors[randomColorIndex];
                  } else {
                    // If all colors have been used, assign a random color from predefinedColors
                    const randomColorIndex = Math.floor(
                      Math.random() * predefinedColors.length
                    );
                    color = predefinedColors[randomColorIndex];
                  }

                  // Store the assigned color for this title
                  titleToColorMap[title] = color;
                }

                return {
                  title,
                  color,
                  weekTime: event.timestamps,
                  onClick: event.onClick,
                };
              }
            );

            setEvents(mappedEvents);
          }
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleChange = (event: any) => {
    startTransition(() => {
      setSession(event);
      // console.log(event);
    });
  };

  return (
    <div className="my-2 w-fit">
      {loading ? (
        <div className="w-32 h-12 rounded-xl bg-gray-200 dark:bg-zinc-600 animate-pulse"></div>
      ) : (
        <select
          onChange={(e) => handleChange(e.target.value)}
          className="w-fit py-3 bg-green-500 hover:bg-green-600 hover:cursor-pointer rounded-md font-bold text-slate-100 shadow focus:ring-0 dark:focus:ring-0"
        >
          {sessionsList.sessionList.map((session, index) => (
            <option
              key={index}
              value={session.sessionQuery}
              className="bg-green-700"
            >
              {session.sessionName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
