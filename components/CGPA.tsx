"use client";

import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CGPA = ({ context }: { context: Result[] }) => {
  const data = context?.map((cgpa) => {
    return {
      name: cgpa.sessionName,
      CGPA: cgpa.cgpaValue,
      GPA: cgpa.gpaValue,
    };
  });

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm bg-zinc-100 dark:bg-zinc-900">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          CGPA
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          GPA
                        </span>
                        <span className="font-bold">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <YAxis />
          <Area
            type="monotone"
            dataKey="CGPA"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area type="monotone" dataKey="GPA" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CGPA;
