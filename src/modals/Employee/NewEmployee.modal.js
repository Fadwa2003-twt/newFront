import React from 'react';
import DefaultModal from "../DefaultModal";
import NewEmployeeForm from "../../Components/Supcomponents/Forms/NewEmployee.form";

function NewEmployeeModal(props) {
    return (
        <DefaultModal
            classNameModal={"w-full md:w-6/12 font-family-primary shadow shadow-[#A6CDD7CC]"}
            isModalOpen={props.isModalOpen} title={"اضافة موظف"} onClose={props.onClose} >
            <NewEmployeeForm className={"gap-4 mx-auto px-4 pb-8"} />
        </DefaultModal>
    );
}

export default NewEmployeeModal;