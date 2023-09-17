import { useEffect, useState, Fragment, useTransition } from "react";
import { useCookiesProvider } from "../app/context/cookies-provider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Skeleton } from "@mui/material";

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
          setSession(responseData.sessionList[1].sessionQuery);
        }
      } else {
        console.error("Error fetching user data");
      }

      setLoading(false);
    }
    getSession();
  }, [cookies]);

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
  }, [cookies, session]);

  const handleChange = (event: any) => {
    startTransition(() => {
      setSession(event.target.value);
    });
  };

  return (
    <Fragment>
      <div className="my-2 w-fit">
        {loading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={200}
            height={50}
            style={{
              borderRadius: "20px",
            }}
          />
        ) : (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Session</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={session}
              label="Session"
              onChange={handleChange}
            >
              {sessionsList.sessionList.map((session, index) => (
                <MenuItem key={index} value={session.sessionQuery}>
                  {session.sessionName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </div>
    </Fragment>
  );
}
