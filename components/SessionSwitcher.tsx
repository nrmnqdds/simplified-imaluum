/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, Fragment, useTransition } from "react";
import { useCookiesProvider } from "../app/context/cookies-provider";
import { Skeleton } from "@components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export default function SessionSwitcher({ onUpdateCurrentSchedule }) {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { cookies } = useCookiesProvider();

  const [sessionsList, setSessionsList] = useState({ sessionList: [] });
  const [session, setSession] = useState("");

  useEffect(() => {
    async function getSession() {
      const response = await fetch(`api/session`, {
        headers: {
          Cookie: cookies.toString(),
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        setSessionsList(responseData);
        if (responseData.sessionList.length > 1) {
          setSession(responseData.sessionList[0].sessionQuery);
        }
      } else {
        console.error("Error fetching user data");
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
          headers: {
            Cookie: cookies.toString(),
          },
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
    <Fragment>
      <div className="my-2 w-fit">
        {loading ? (
          <Skeleton className="w-24 h-8 rounded-xl" />
        ) : (
          <Select onValueChange={handleChange} defaultValue={session}>
            <SelectTrigger className="w-fit ml-3 py-6">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              {sessionsList.sessionList.map((session, index) => (
                <SelectItem key={index} value={session.sessionQuery}>
                  {session.sessionName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </Fragment>
  );
}
