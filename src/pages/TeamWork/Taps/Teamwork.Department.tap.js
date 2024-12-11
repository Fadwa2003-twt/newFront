import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableWithBtns from "../../../Tables/TableWithBtns";
import NewDepartmentModal from "../../../modals/Department/NewDepartment.modal";
import EditDepartmentModal from "../../../modals/Department/EditDepartment.modal";
import GetDepartmentAction from "../../../redux/action/Department/GetDepartment.action";
import GetEmployeesAction from "../../../redux/action/Employee/GetEmployees.action";
import DeleteDepartmentAction from "../../../redux/action/Department/DeleteDepartment.action";
import DepartmentTableHeader from "../../../Components/HomeComponents/Taps/DepartmentTableHeader";
import DepartmentTableBody from "../../../Components/HomeComponents/Taps/DepartmentTableBody";
import {handelEdit, handleSomeDelete} from "../../../methods/FunctionsOfAction";

function TeamworkDepartmentTap({ title }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.data);
  const employees = useSelector((state) => state.employees.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [rowsPerPage] = useState(10);
  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when employees or searchInput change
  }, [searchInput]);

  // Filter employees based on search input and selected departments
  const filtered = departments.filter((department) => {
    const matchesSearchInput =
        department.name.toLowerCase().includes(searchInput.toLowerCase())
  })
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    dispatch(GetDepartmentAction({ page: newPage ,limit:10}));
  };

  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
      useState(false);
  const [isEditDepartmentModalOpen, setIsEditDepartmentModalOpen] =
      useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(GetEmployeesAction({ page: 1 }));
    dispatch(GetDepartmentAction({ page: 1 }));
  }, [dispatch]);

  const displayAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(!isAddDepartmentModalOpen);
  };


  const handelEditDepartment = () => {
    handelEdit(selectedRows,
        departments,
        setIsEditDepartmentModalOpen,
        setSelectedDepartment,
        "يرجى اختيار قسم واحد لتعديله")
  }


  const handleDeleteDepartments = () => {
    handleSomeDelete(selectedRows,
        setSelectedRows,
        departments,
        (department) => dispatch(DeleteDepartmentAction(department)))
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(departments.map((dept) => dept.id));
    } else {
      setSelectedRows([]);
    }
  };

  const totalItems = filtered.length;
  const isAllSelected = selectedRows.length === totalItems;

  const handleRowSelect = (id) => {
    setSelectedRows((prevSelected) =>
        prevSelected.includes(id)
            ? prevSelected.filter((rowId) => rowId !== id)
            : [...prevSelected, id]
    );
  };

  const supervisors = employees.map((emp) => ({
    _id: emp._id,
    name: emp.name,
  }));

  const editData = selectedDepartment
      ? {
        id: selectedDepartment.id,
        name:selectedDepartment.name,
        department: selectedDepartment,
        supervisors,
      }
      : null;

  return (
      <>
        <TableWithBtns
            title={title}
            className={"gap-3 mt-10"}
            totalItems={totalItems}
            itemsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            editIcon={true}
            handelEditIcon={handelEditDepartment}
            deleteIcon={true}
            handelDeleteIcon={handleDeleteDepartments} // Handle delete directly
            departmentIcon={true}
            handelDepartmentIcon={displayAddDepartmentModal}
            tipDepartmentIcon={"اضافة قسم جديد"}
            tipDeleteIcon={"حذف الأقسام المحددة"}
            tipEditIcon={"تعديل القسم المحدد"}
        >
          <DepartmentTableHeader handleSelectAll={handleSelectAll} />
          <DepartmentTableBody
              departments={departments}
              handleRowSelect={handleRowSelect}
              selectedRows={selectedRows}
          />
        </TableWithBtns>
        <NewDepartmentModal
            isModalOpen={isAddDepartmentModalOpen}
            onClose={displayAddDepartmentModal}
        />
        <EditDepartmentModal
            isModalOpen={isEditDepartmentModalOpen}
            onClose={() => setIsEditDepartmentModalOpen(false)}
            editData={editData}
        />
      </>
  );
}

export default TeamworkDepartmentTap;