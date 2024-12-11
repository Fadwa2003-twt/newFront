import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import GetChartsAdminAction from "../redux/action/Charts/GetChartsAdmin.action";
import GetChartsAction from "../redux/action/Charts/GetCharts.action";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ type }) => {
  console.log({ type });
  const dispatch = useDispatch();
  const charts = useSelector((state) => state.charts.data);

  useEffect(() => {
    if (type == "admin") {
      dispatch(GetChartsAdminAction());
    } else {
      dispatch(GetChartsAction());
    }
  }, []);

  const data = {
    labels: [
      "المهام المنجزة قبل الوقت",
      "المهام المنجزة بعد الوقت",
      "المهام غير المنجزة بعد الوقت",
      "المهام غير المنجزة قبل الوقت",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          100,
          40,
          10,
          5,
        ],
        backgroundColor: [
          "rgba(255, 167, 38, 1)",
          "rgba(199, 40, 40, 1)",
          "rgba(50, 199, 194, 1)",
          "rgba(255, 235, 59, 1);",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        direction: "rtl",
        labels: {
          align: "end",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 12, // Adjust padding between legend items
        },
      },
      title: {
        display: false,
        text: "Doughnut Chart",
      },
    },
  };

  return (
    <div className={"w-full h-full"}>
      <Doughnut data={data} options={options} width={200} height={200} />
    </div>
  );
};

export default DoughnutChart;
