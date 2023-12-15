"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const CGPA = ({ context }: { context: Result[] }) => {
  // const [data, setData] = useState<Cgpa[]>();

  const data = {
    labels: context?.map((cgpa) => cgpa.sessionName),
    datasets: [
      {
        label: "CGPA",
        data: context?.map((cgpa) => cgpa.cgpaValue),
        fill: true,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "GPA",
        data: context?.map((cgpa) => cgpa.gpaValue),
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <Line width="100%" options={options} data={data} />
    </div>
  );
};

export default CGPA;
