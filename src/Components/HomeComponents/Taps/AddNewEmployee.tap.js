import React, { useState } from "react";
import BtnsIcons from "../../Supcomponents/Buttons/BtnsIcons";
import TextInput from "../../Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Supcomponents/inputs/DefaultSelect";
import DefaultFileInput from "../../Supcomponents/inputs/DefaultFileInput";
import DefaultBtn from "../../Supcomponents/Buttons/DefaultBtn";
import NewDepartmentModal from "../../../modals/Department/NewDepartment.modal";
import EditDepartmentModal from "../../../modals/Department/EditDepartment.modal";
import NewEmployeeForm from "../../Supcomponents/Forms/NewEmployee.form";

function AddNewEmployeeTap(props) {
  const [isAddDepartmentModalOpen, setIsAddDepartmentModalOpen] =
    useState(false);
  const [isEditDepartmentModalOpen, setIsEditDepartmentModalOpen] =
    useState(false);

  const displayAddDepartmentModal = () => {
    setIsAddDepartmentModalOpen(!isAddDepartmentModalOpen);
  };
  const displayEditDepartmentModal = () => {
    setIsEditDepartmentModalOpen(!isEditDepartmentModalOpen);
  };
  return (
    <div className={""}>
      <NewEmployeeForm title={"اضافة موظف"} className={"gap-6 mx-auto px-20"} />

      <NewDepartmentModal
        isModalOpen={isAddDepartmentModalOpen}
        onClose={displayAddDepartmentModal}
      />
      <EditDepartmentModal
        isModalOpen={isEditDepartmentModalOpen}
        onClose={displayEditDepartmentModal}
      />
    </div>
  );
}

export default AddNewEmployeeTap;
