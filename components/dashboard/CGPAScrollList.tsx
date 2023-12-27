"use client";

import useResult from "@/hooks/useResult";

const CGPAScrollList = () => {
  const { result } = useResult();
  return (
    <>
      {result?.map((result, index) => {
        return (
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
        );
      })}
    </>
  );
};

export default CGPAScrollList;
