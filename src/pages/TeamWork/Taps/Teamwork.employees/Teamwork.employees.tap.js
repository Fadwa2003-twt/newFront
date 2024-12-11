import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartmentsComponent from "./DepartmentsComponent";
import GetEmployeesAction from "../../../../redux/action/Employee/GetEmployees.action";
import GetDepartmentAction from "../../../../redux/action/Department/GetDepartment.action";
import EmployeesTableComponent from "./EmployeesTableComponent";

function TeamWorkEmployeesTap() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.data);
  const departments = useSelector((state) => state.departments.data);

  const [searchInput, setSearchInput] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    dispatch(GetEmployeesAction({ page: 1,limit:10 }));
    dispatch(GetDepartmentAction(  { page: 1 ,limit :10}));
  }, [dispatch]);

  const handleDepartmentSelect = (selectedKeys) => {
    setSelectedDepartments(selectedKeys);
  };

  return (
    <div className="w-full mt-10 flex flex-wrap h-full items-center">
      <div className="w-full flex gap-4">
        <DepartmentsComponent
          departments={departments}
          onDepartmentSelect={handleDepartmentSelect}
        />
        <div className="flex-1">
          <EmployeesTableComponent
            employees={employees}
            selectedDepartments={selectedDepartments}
            searchInput={searchInput}
            onSearchChange={setSearchInput}
          />
        </div>
      </div>
    </div>
  );
}

export default TeamWorkEmployeesTap;
