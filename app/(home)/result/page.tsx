"use client";

import { useEffect, useState, Fragment } from "react";
import ImaluumClient from "@/utils/imaluumClient";
import CGPA from "@/components/CGPA";
import ResultSwitcher from "@/components/ResultSwitcher";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

const Page = () => {
  const { results } = ImaluumClient() || {};
  const [subjects, setSubjects] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Sort subjects based on the isPassed function and sortOrder
  const sortedSubjects = subjects.slice().sort((a, b) => {
    const isPassedA = isPassed(a.courseGrade);
    const isPassedB = isPassed(b.courseGrade);

    // Determine sorting direction based on sortOrder
    const direction = sortOrder === "asc" ? 1 : -1;

    // Sort by passed status first, and then alphabetically by course code
    if (isPassedA === isPassedB) {
      return direction * a.courseCode.localeCompare(b.courseCode);
    }

    // Sort passed subjects first
    return direction * (isPassedA ? -1 : 1);
  });

  return (
    <main className="flex-1 min-h-screen p-5">
      <div className="flex flex-row items-center justify-center w-full h-[30vh] rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900">
        <div className="flex-[2] w-full h-full">
          <CGPA context={results} />
        </div>
        <div className="flex-1 flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
          {results?.map((result, index) => (
            <div key={index} className="flex flex-col text-xs md:text-sm">
              <p>
                <span className="font-bold text-zinc-900 dark:text-slate-100">
                  Session:{" "}
                </span>
                {result.sessionName}
              </p>
              <p>
                <span className="font-bold text-zinc-900 dark:text-slate-100">
                  GPA:{" "}
                </span>
                {result.gpaValue}
              </p>
              <p>
                <span className="font-bold text-zinc-900 dark:text-slate-100">
                  CGPA:{" "}
                </span>
                {result.cgpaValue}
              </p>
            </div>
          ))}
        </div>
      </div>
      {!results ? (
        <div>Loading...</div>
      ) : (
        <ResultSwitcher courses={results} setEvents={setSubjects} />
      )}
      <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border-2 border-slate-400/10 bg-neutral-200 p-4 dark:bg-neutral-900 mt-2">
        <div id="header" className="w-full flex flex-row mb-2 p-4">
          <div className="flex-1">
            <p className="zinc-100">Course Code</p>
          </div>
          <div className="flex-1">
            <p className="zinc-100">Grade</p>
          </div>
          <div className="flex-1 flex flex-row">
            <span className="cursor-pointer flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-slate-100"
                aria-hidden="true"
                onClick={toggleSortOrder}
              />
            </span>
            <p className="zinc-100">Status</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          {sortedSubjects?.map((subject, index) => (
            <div
              key={index}
              id="subjects"
              className="w-full flex flex-row bg-neutral-300 p-4 dark:bg-neutral-800 border-zinc-700 rounded-xl border"
            >
              <div className="flex-1">
                <p className="zinc-100">{subject.courseCode}</p>
              </div>
              <div className="flex-1">
                <p className="zinc-100">{subject.courseGrade}</p>
              </div>
              <div className="flex-1">
                {isPassed(subject.courseGrade) ? (
                  <p className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold leading-6 text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-indigo-500/20">
                    Passed
                  </p>
                ) : (
                  <p className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 dark:text-red-400 ring-1 ring-inset ring-indigo-500/20">
                    Failed
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
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
      return true;
    default:
      return false;
  }
};

export default Page;
