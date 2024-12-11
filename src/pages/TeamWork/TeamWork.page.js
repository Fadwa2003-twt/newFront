import React from "react";
import TapsComponent from "../../Components/Taps.component";
// import
import HomeEmployeesTap from "./Taps/Teamwork.home.tap";
import EmployeesEmployeesTap from "./Taps/Teamwork.employees/Teamwork.employees.tap";
import TeamWorkDepartmentTap from "./Taps/Teamwork.Department.tap";

function EmployeesPage() {
  return (
    <TapsComponent
      firstTapTitle={"الرئيسية"}
      secondTapTitle={"الأقسام"}
      firstTapComponent={<HomeEmployeesTap />}
      SecondTapComponent={<TeamWorkDepartmentTap title={"الاقسام"} />}
    />
  );
}

export default EmployeesPage;
