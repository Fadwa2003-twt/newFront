import React, { useState, useEffect } from "react";
import TableWithBtns from "../../../../Tables/TableWithBtns";
import NewEmployeeModal from "../../../../modals/Employee/NewEmployee.modal";
import EditEmployeeModal from "../../../../modals/Employee/EditEmployee.modal";
import { useDispatch } from "react-redux";
import DeleteSomeEmployeesAction from "../../../../redux/action/Employee/DeleteSomeEmployees.action";
import GetEmployeesAction from "../../../../redux/action/Employee/GetEmployees.action";

function EmployeesTableComponent({ employees, selectedDepartments }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [isEditEmployeeModalOpen, setIsEditEmployeeModalOpen] = useState(false);

  // Filter employees based on search input and selected departments
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearchInput =
        employee.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchInput.toLowerCase());

    const matchesDepartment =
        selectedDepartments.length > 0
            ? selectedDepartments.includes(employee.Department?._id)
            : true;

    return matchesSearchInput && matchesDepartment;
  });

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(GetEmployeesAction({ page: newPage ,limit:10}));
  };

  const handleRowSelect = (employeeId) => {
    setSelectedRows((prevSelected) =>
        prevSelected.includes(employeeId)
            ? prevSelected.filter((id) => id !== employeeId)
            : [...prevSelected, employeeId]
    );
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allEmployeeIds = filteredEmployees.map((employee) => employee._id);
      setSelectedRows(allEmployeeIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      setIsEditEmployeeModalOpen(true);
    } else {
      alert("Please select a single employee to edit.");
    }
  };

  const handleDeleteClick = () => {
    if (selectedRows.length > 0) {
      dispatch(DeleteSomeEmployeesAction({ employeesIds: selectedRows }));
      setSelectedRows([]); // Clear selected rows after deletion
    } else {
      alert("Please select at least one employee to delete.");
    }
  };

  const handleAddClick = () => {
    setIsNewEmployeeModalOpen(true);
  };

  const closeNewEmployeeModal = () => {
    setIsNewEmployeeModalOpen(false);
  };

  const closeEditEmployeeModal = () => {
    setIsEditEmployeeModalOpen(!isEditEmployeeModalOpen);
  };

  const totalItems = filteredEmployees.length;
  const isAllSelected = selectedRows.length === totalItems;

  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when employees or searchInput change
  }, [searchInput, selectedDepartments]);

  return (
      <>
        <TableWithBtns
            title={"جدول الموظفين"}
            isInput={true}
            inputTitle={"بحث"}
            inputName={"search"}
            inputValue={searchInput}
            onInputChange={(e) => setSearchInput(e.target.value)}
            inputClass={"my-5"}
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            userIcon={true}
            handelUserIcon={handleAddClick}
            editIcon={true}
            handelEditIcon={handleEditClick}
            deleteIcon={true}
            handelDeleteIcon={handleDeleteClick}
            tipUserIcon={"اضافة موظف جديد"}
            tipDeleteIcon={"حذف الموظفين المحددين"}
            tipEditIcon={"تعديل الموظف المحدد"}
            className="overflow-hidden"
        >
          <thead className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font">
          <tr>
            <th scope="col" className="px-6 py-3">
              <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
              />
            </th>
            <th scope="col" className="px-6 py-3">
              الاسم
            </th>
            <th scope="col" className="px-6 py-3">
              الايميل
            </th>
            <th scope="col" className="px-6 py-3">
              الفئة
            </th>
            <th scope="col" className="px-6 py-3">
              الفريق
            </th>
            <th scope="col" className="px-6 py-3">
              نوع الموظف
            </th>
            <th scope="col" className="px-6 py-3">
              ايام الاجازه
            </th>
          </tr>
          </thead>
          <tbody>
          {filteredEmployees
              .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
              )
              .map((employee) => (
                  <tr
                      key={employee._id}
                      onClick={() => handleRowSelect(employee._id)}
                      className={
                        selectedRows.includes(employee._id) ? "bg-gray-200" : ""
                      }
                  >
                    <td className="px-6 py-4">
                      <input
                          type="checkbox"
                          checked={selectedRows.includes(employee._id)}
                          onChange={() => handleRowSelect(employee._id)}
                      />
                    </td>
                    <td className="px-6 py-4">{employee.name}</td>
                    <td className="px-6 py-4">{employee.email}</td>
                    <td className="px-6 py-4">
                      {employee.Category ? employee.Category.name : "No Category"}
                    </td>
                    <td className="px-6 py-4">{employee.Department?.name}</td>
                    <td className="px-6 py-4">{employee.type}</td>
                    <td className="px-6 py-4">{employee.holidays}</td>
                  </tr>
              ))}
          </tbody>
        </TableWithBtns>

        <NewEmployeeModal
            isModalOpen={isNewEmployeeModalOpen}
            onClose={closeNewEmployeeModal}
        />
        {selectedRows.length === 1 && (
            <EditEmployeeModal
                isModalOpen={isEditEmployeeModalOpen}
                onClose={closeEditEmployeeModal}
                employee={employees.find((emp) => emp._id === selectedRows[0])}
            />
        )}
      </>
  );
}

export default EmployeesTableComponent;
