import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultModal from "../DefaultModal";
import CreateDepartmentAction from "../../redux/action/Department/CreateDepartment.action";
import { Grid } from "@mui/material";
import GetEmployeesAction from "../../redux/action/Employee/GetEmployees.action";

// Validation schema for Formik
const DepartmentSchema = Yup.object().shape({
  name: Yup.string().required("اسم القسم مطلوب"),
  supervisor: Yup.string().required("اسم المدير مطلوب"),
});


function NewDepartmentModal({ isModalOpen, onClose }) {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.data);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(CreateDepartmentAction(values))
      .then(() => {
        setSubmitting(false);
        resetForm();
        onClose();
      })
      .catch((error) => {
        setSubmitting(false);
        console.error("Error creating department:", error);
      });
  };


  useEffect(() => {
    dispatch(GetEmployeesAction({ page: 1 }));
  }, [dispatch]);

  return (
    <DefaultModal
        classNameContener={"bg-white bg-opacity-50"}
        classNameModal={"w-full md:w-5/12 font-family-primary shadow shadow-[#A6CDD7CC]"}
      isModalOpen={isModalOpen}
        isTitle={true}
      title={"اضافة قسم"}
      onClose={onClose}
    >
      <Formik
        initialValues={{ name: "", supervisor: "" }}
        validationSchema={DepartmentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form className="p-5">
            <div className={"flex flex-wrap flex-col sm:flex-row  items-center sm:justify-between gap-5"} container spacing={10}>
              <div className={"w-full px-5 sm:px-0 sm:w-[42%]"}>
                <TextInput
                  component={TextInput}
                  name="name"
                  title="اسم القسم"
                  error={touched.name && errors.name}
                  onChange={(e) => setFieldValue("name", e.target.value)}
                />
              </div>
              <div className={"w-full px-5 sm:px-0 sm:w-[42%]"}>
                <DefaultSelect
                  component={DefaultSelect}
                  name="supervisor"
                  title="اسم المدير"
                  classNameSelect={"select-arrow-left py-2"}
                  error={touched.supervisor && errors.supervisor}
                  options={employees}
                  onChange={(e) => setFieldValue("supervisor", e.target.value)}
                />
              </div>
            </div>
            <DefaultBtn
              className={"my-10 justify-center"}
              title={"اضافه قسم"}
              type="submit"
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </DefaultModal>
  );
}

export default NewDepartmentModal;
