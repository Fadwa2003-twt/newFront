import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Formik, useFormik} from "formik";
import * as Yup from "yup";
import { aleartsToast } from "../../alearts/alearts";

import DefaultModal from "../DefaultModal";
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import EditDepartmentAction from "../../redux/action/Department/EditDepartment.action";
import Grid from "@mui/material/Grid";
import CreateDepartmentAction from "../../redux/action/Department/CreateDepartment.action";
import GetEmployeesAction from "../../redux/action/Employee/GetEmployees.action";

// Validation schema using Yup

const EditDepartmentModal = ({ editData, isModalOpen, onClose }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.data);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (editData) {
      // If editing, dispatch the EditDepartmentAction
      dispatch(EditDepartmentAction({ ...values, id: editData.id }))
          .then(() => {
            setSubmitting(false);
            resetForm();
            onClose();
          })
          .catch((error) => {
            setSubmitting(false);
            console.error("Error updating department:", error);
          });
    } else {
      // If creating a new department
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
    }
  };


  useEffect(() => {
    dispatch(GetEmployeesAction({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    console.log(editData)
  }, [editData]);

  return (
      <DefaultModal
          classNameContener={"bg-white bg-opacity-50"}
          classNameModal={"w-full md:w-5/12 font-family-primary shadow shadow-[#A6CDD7CC]"}
          isModalOpen={isModalOpen}
          isTitle={true}
          title={"تعديل قسم"}
          onClose={onClose}
      >
        <Formik
            initialValues={{
              name: editData?.name || "",
              supervisor: editData?.department?.supervisor || "",
            }}
            enableReinitialize={true}
            onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue,values }) => (
              <Form className="p-5">
                <div className={"flex flex-wrap flex-col sm:flex-row  items-center sm:justify-between gap-5"} container spacing={10}>
                  <div className={"w-full px-5 sm:px-0 sm:w-[42%]"}>
                    <TextInput
                        component={TextInput}
                        name="name"
                        title="اسم القسم"
                        value={values.name}
                        error={touched.name && errors.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                  </div>
                  <div className={"w-full px-5 sm:px-0 sm:w-[42%]"}>
                    <DefaultSelect
                        component={DefaultSelect}
                        name="supervisor"
                        optionSelecte={values.supervisor}
                        classNameSelect={"select-arrow-left py-2"}
                        error={touched.supervisor && errors.supervisor}
                        options={employees}
                        onChange={(e) => setFieldValue("supervisor", e.target.value)}
                    />
                  </div>
                </div>
                <DefaultBtn
                    className={"my-10 justify-center"}
                    title={"تعديل قسم"}
                    type="submit"
                    disabled={isSubmitting}
                />
              </Form>
          )}
        </Formik>
      </DefaultModal>
  );
}

export default EditDepartmentModal;
