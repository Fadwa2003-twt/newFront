import React from "react";

function DepartmentTableBody({ departments, handleRowSelect, selectedRows }) {
  return (
    <tbody>
      {departments.map((department) => (
        <tr key={department.id}>
          <td className="px-6 py-4">
            <input
              type="checkbox"
              checked={selectedRows.includes(department.id)}
              onChange={() => handleRowSelect(department.id)}
            />
          </td>
          <td className="px-6 py-4">{department.name}</td>
          <td className="px-6 py-4">
            {department.supervisor
              ? department.supervisor.name
              : "No supervisor"}
          </td>
          <td className="px-6 py-4">{department.totalEmp}</td>
          <td className="px-6 py-4">
            {department.points > 0 ? department.points : 0}
          </td>
          <td className="px-6 py-4">
            {department.interaction ?? "No interaction"}
          </td>
          <td className="px-6 py-4 text-red-600">
            {department.achievement ?? "No achievement"}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default DepartmentTableBody;
