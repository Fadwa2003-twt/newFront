import React from "react";
import TreeComponent from "./Tree.component";

function DepartmentsComponent({ departments, onDepartmentSelect }) {
  const handleDepartmentSelect = (selectedKeys) => {
    console.log("Selected department IDs:", selectedKeys);

    if (onDepartmentSelect) {
      onDepartmentSelect(selectedKeys);
    }
  };

  return (
    <TreeComponent
      title={"الأقسام"}
      onCheck={handleDepartmentSelect} // Pass onCheck instead of onChange
    />
  );
}

export default DepartmentsComponent;
