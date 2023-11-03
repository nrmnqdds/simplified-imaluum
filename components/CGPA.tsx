"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, YAxis, XAxis, Tooltip } from "recharts";
import useWindowDimensions from "@/hooks/useWindowDimensions";

const CGPA = ({ context }: { context: ImaluumData }) => {
  const [data, setData] = useState<Cgpa[]>();
  const { width } = useWindowDimensions();

  // useEffect(() => {
  //   console.log("width", width);
  // }, [width]);

  useEffect(() => {
    if (context) {
      // console.log(context.cgpa);
      setData(context.cgpa);
    }
  }, [context]);

  return (
    <div className="absolute flex items-center justify-center">
      <LineChart width={width - (width - 600)} height={170} data={data}>
        <XAxis dataKey="sessionName" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="cgpaValue"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="gpaValue"
          stroke="#40e0d0"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default CGPA;
