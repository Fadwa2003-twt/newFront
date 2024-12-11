import React from "react";
import LineChart from "../../Charts/LineChart ";
import DoughnutChart from "../../Charts/DoughnutChart";

function ChartsHomeComponent(props) {
  return (
    <div
      className={
        "flex flex-row-reverse justify-evenly gap-10 py-10 border-b-2 border-gray-300"
      }
    >
      <div className={"w-5/12 flex items-center justify-center"}>
        <LineChart />
      </div>
      <div className={"w-3/12 flex items-center justify-center"}>
        <DoughnutChart type="admin" />
      </div>
    </div>
  );
}

export default ChartsHomeComponent;
