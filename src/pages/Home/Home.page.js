import React from "react";
import TapsComponent from "../../Components/Taps.component";
import AddDepartmentTap from "../../Components/HomeComponents/Taps/AddDepartment.tap";
import AddNewEmployeeTap from "../../Components/HomeComponents/Taps/AddNewEmployee.tap";
import HomeTap from "../../Components/HomeComponents/Taps/Home.tap";

function HomePage(props) {
  return (
    <TapsComponent
      firstTapTitle={"الرئيسية"}
      secondTapTitle={"اضافة قسم"}
      firstTapComponent={<HomeTap />}
      SecondTapComponent={<AddDepartmentTap />}
    />
  );
}

export default HomePage;
