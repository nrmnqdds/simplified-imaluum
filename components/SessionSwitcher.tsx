/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Fragment, useTransition } from "react";
import { useCookiesProvider } from "../app/context/cookies-provider";
import React from "react";
import { redirect } from "next/navigation";

export default function SessionSwitcher({ onUpdateCurrentSchedule }) {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { cookies } = useCookiesProvider();

  const [sessionsList, setSessionsList] = useState({ sessionList: [] });
  const [session, setSession] = useState("");

  useEffect(() => {
    async function getSession() {
      const response = await fetch(`api/session`, {
        method: "POST",
      });

      if (response.ok) {
        const responseData = await response.json();
        setSessionsList(responseData);
        if (responseData.sessionList.length > 1) {
          setSession(responseData.sessionList[0].sessionQuery);
        }
      } else {
        redirect("/");
      }

      setLoading(false);
    }
    getSession();
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
          onUpdateCurrentSchedule(responseData);
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
