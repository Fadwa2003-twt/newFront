import React from "react";
import DefaultModal from "../DefaultModal";
import EditEmployeeForm from "../../Components/Supcomponents/Forms/EditEmployee.from";

function EditEmployeeModal(props) {
  return (
    <DefaultModal
      isModalOpen={props.isModalOpen}
      onClose={props.onClose}
      classNameModal={"w-full md:w-6/12 " + props.classNameModal}
      title={"تعديل موظف"}
    >
      <EditEmployeeForm
        employee={props.employee}
        className={"gap-6 mx-auto px-10 pb-8"}
      />
    </DefaultModal>
  );
}

export default EditEmployeeModal;
