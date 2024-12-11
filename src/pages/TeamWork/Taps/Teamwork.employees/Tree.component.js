import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetDepartmentAction from "../../../../redux/action/Department/GetDepartment.action";

function TreeComponent({ title, onCheck }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.data);

  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    dispatch(GetDepartmentAction({ page: 1 }));
  }, [dispatch]);

  const handleCheckboxChange = (id) => {
    setSelectedKeys((prevKeys) => {
      const newKeys = prevKeys.includes(id)
        ? prevKeys.filter((key) => key !== id)
        : [...prevKeys, id];

      if (onCheck) {
        onCheck(newKeys); // Notify parent of the selected departments
      }

      return newKeys;
    });
  };

  return (
    <div className="flex flex-col md:w-60 w-full gap-10">
      <h3 className="font-bold pr-5">{title}</h3>
      <div className="flex flex-col p-5 border-l-2">
        <div className="flex flex-col bg-default-input p-5 rounded-md">
          {departments.map((department) => (
            <div key={department._id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedKeys.includes(department._id)}
                onChange={() => handleCheckboxChange(department._id)}
              />
              <p className="text-md">{department.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TreeComponent;
