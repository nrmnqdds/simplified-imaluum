"use client";

import LottiePlayer from "@/components/LottiePlayer";
import { ResultSwitcher } from "@/components/ResultSwitcher";
import useResult from "@/hooks/useResult";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

type SortedSubjectType = {
  courseCode: string;
  courseName: string;
  courseGrade: string;
};

const Page = () => {
  const { result } = useResult();
  const [subjects, setSubjects] = useState<SortedSubjectType[]>([]);
  const [session, setSession] = useState<string>("");
  const [notes, setNotes] = useState({
    remarks: "",
    status: "",
  });
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  useEffect(() => {
    if (session) {
      const tempRemarks = result?.filter(
        (result) => result.sessionName === session,
      )[0].remarks;
      const tempStatus = result?.filter(
        (result) => result.sessionName === session,
      )[0].status;
      setNotes({
        remarks: tempRemarks || "No Remarks",
        status: tempStatus || "No Status",
      });
    }
  }, [session, result]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort subjects based on the isPassed function and sortOrder
  const sortedSubjects = subjects.slice().sort((a, b) => {
    const isPassedA = isPassed(a.courseGrade);
    const isPassedB = isPassed(b.courseGrade);

    const direction = sortOrder === "asc" ? 1 : -1;

    if (isPassedA === isPassedB) {
      return direction * a.courseCode.localeCompare(b.courseCode);
    }

    return direction * (isPassedA ? -1 : 1);
  });

  const passedCount = subjects.reduce((count, subject) => {
    return count + (isPassed(subject.courseGrade) ? 1 : 0);
  }, 0);

  const failedCount = subjects.length - passedCount;

  return (
    <main className="flex-1 flex flex-col gap-2 min-h-screen px-2">
      {!result ? (
        <div className="h-[500px] w-full flex flex-col items-center justify-center">
          <LottiePlayer
            animationData={require("../../../assets/lottie/study.lottie")}
          />
          <h1 className="text-lg md:text-5xl text-center font-bold text-white">
            You have not taken any exams yet
          </h1>
        </div>
      ) : (
        <>
          <div className="w-fit p-2 flex gap-5">
            <ResultSwitcher
              courses={result}
              setEvents={setSubjects}
              setSession={setSession}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-5 items-center justify-center w-full h-full rounded-xl border border-border p-4 bg-background">
            <div className="flex-1 flex flex-row items-center justify-center gap-5">
              <div className="flex flex-col gap-2 items-center justify-center bg-card p-4 font-semibold border-border rounded-xl border">
                <h1 className="text-zinc-300 text-xs lg:text-sm">
                  Subjects Taken:
                </h1>
                <p className="text-zinc-100 text-lg lg:text-3xl">
                  {subjects.length}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center rounded-xl bg-cyan-500/10 p-4 text-sm font-semibold leading-6 text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
                <h1 className="text-xs lg:text-sm">Subjects Passed:</h1>
                <p className="text-lg lg:text-3xl">{passedCount}</p>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center rounded-xl bg-red-500/10 p-4 text-sm font-semibold leading-6 text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-500/20">
                <h1 className="text-xs lg:text-sm">Subjects Failed:</h1>
                <p className="text-lg lg:text-3xl">{failedCount}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-center justify-center gap-5">
              <div className="flex flex-col gap-2 items-center justify-center p-4 font-semibold bg-card border-border rounded-xl border">
                <h1 className="text-zinc-300 text-xs lg:text-sm">Status:</h1>
                <p className="text-zinc-100 text-sm lg:text-xl">
                  {notes.status}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center bg-card p-4 font-semibold border-border rounded-xl border">
                <h1 className="text-zinc-300 text-xs lg:text-sm">Remarks:</h1>
                <p className="text-zinc-100 text-sm lg:text-xl">
                  {notes.remarks}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border border-border bg-background p-4">
            <div id="header" className="w-full flex flex-row mb-2 p-4">
              <div className="flex-1 w-fit flex items-center justify-start text-xs sm:text-sm">
                <p className="zinc-100 lg:pl-24">Subject Code</p>
              </div>
              <div className="flex-1 hidden sm:flex items-center justify-center text-center lg:justify-start text-xs sm:text-sm">
                <p className="zinc-100">Subject Name</p>
              </div>
              <div className="flex-1 flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                <p className="zinc-100 lg:pl-24">Grade</p>
              </div>
              <div className="flex-1 flex flex-row items-center justify-start text-xs sm:text-sm">
                <button
                  name="sort-button"
                  type="button"
                  className="flex items-center justify-center bg-card p-2 rounded-md active:border-slate-400 border border-border"
                  onClick={toggleSortOrder}
                >
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-slate-100"
                    aria-hidden="true"
                  />
                  <p className="zinc-100">Status</p>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {sortedSubjects?.map((subject, index) => (
                <div
                  key={index}
                  id="subjects"
                  className="w-full flex flex-row bg-card p-4 border-border rounded-xl border"
                >
                  <div className="flex-1 w-fit flex items-center justify-start text-xs sm:text-sm">
                    <p className="zinc-100 lg:pl-24">{subject.courseCode}</p>
                  </div>
                  <div className="flex-1 hidden sm:flex items-center justify-start text-xs sm:text-sm">
                    <p className="zinc-100">{subject.courseName}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center lg:justify-start text-xs sm:text-sm">
                    <p className="zinc-100 lg:pl-24">{subject.courseGrade}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-start text-xs sm:text-sm">
                    {isPassed(subject.courseGrade) ? (
                      <p className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
                        Passed
                      </p>
                    ) : (
                      <p className="w-fit rounded-full bg-red-500/10 px-3 py-1 font-semibold text-red-600 dark:text-red-400 ring-1 ring-inset ring-red-500/20">
                        Failed
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

const isPassed = (grade: string) => {
  switch (grade) {
    case "A":
    case "A-":
    case "B+":
    case "B":
    case "B-":
    case "C+":
    case "C":
    case "C-":
    case "PA":
    case "EX":
      return true;
    default:
      return false;
  }
};

export default Page;
