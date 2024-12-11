import React, {useEffect, useState} from "react";
import ChartsHomeComponent from "../Charts.home.component";
import DefultTable from "../../../Tables/DefultTable";
import { useDispatch, useSelector } from "react-redux";

function HomeTap(props) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);


  return (
    <>
      <ChartsHomeComponent />
    </>
  );
}

export default HomeTap;
