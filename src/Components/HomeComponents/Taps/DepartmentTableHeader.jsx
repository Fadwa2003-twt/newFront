import React from "react";

function DepartmentTableHeader({ handleSelectAll }) {
  return (
    <thead className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font">
      <tr>
        <th scope="col" className="px-6 py-3">
          <input type="checkbox" onChange={handleSelectAll} />
        </th>
        <th scope="col" className="px-6 py-3">
          القسم
        </th>
        <th scope="col" className="px-6 py-3">
          مدير القسم
        </th>
        <th scope="col" className="px-6 py-3">
          عدد الموظفين
        </th>
        <th scope="col" className="px-6 py-3">
          النقاط
        </th>
        <th scope="col" className="px-6 py-3">
          التفاعل
        </th>
        <th scope="col" className="px-6 py-3">
          الانجاز
        </th>
      </tr>
    </thead>
  );
}

export default DepartmentTableHeader;
