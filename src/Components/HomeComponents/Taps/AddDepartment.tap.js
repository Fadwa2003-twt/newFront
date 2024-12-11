import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableWithBtns from "../../../Tables/TableWithBtns";
import NewDepartmentModal from "../../../modals/Department/NewDepartment.modal";
import EditDepartmentModal from "../../../modals/Department/EditDepartment.modal";
import GetDepartmentAction from "../../../redux/action/Department/GetDepartment.action";
import GetEmployeesAction from "../../../redux/action/Employee/GetEmployees.action";
import DeleteDepartmentAction from "../../../redux/action/Department/DeleteDepartment.action";
import DepartmentTableHeader from "./DepartmentTableHeader";
import DepartmentTableBody from "./DepartmentTableBody";
import BtnsIcons from "../../Supcomponents/Buttons/BtnsIcons";
import {Form, Formik} from "formik";
import {Grid} from "@mui/material";
import TextInput from "../../Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Supcomponents/Buttons/DefaultBtn";
import * as Yup from "yup";
import CreateDepartmentAction from "../../../redux/action/Department/CreateDepartment.action";
import TreeComponent from "../../Supcomponents/Tree.component";
import {aleartsToast} from "../../../alearts/alearts";
import {handelEdit, handelEditCategory, handleSomeDelete} from "../../../methods/FunctionsOfAction";

function AddDepartmentTap({ title }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.data);
  const employees = useSelector((state) => state.employees.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [rowsPerPage] = useState(10);
  const DepartmentSchema = Yup.object().shape({
    name: Yup.string().required("اسم القسم مطلوب"),
    supervisor: Yup.string().required("اسم المدير مطلوب"),
  });
  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when employees or searchInput change
  }, [searchInput]);


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

  const handelDeleteDepartments = () => {
    handleSomeDelete(selectedRows,
        setSelectedRows,
        departments,
        (department) => dispatch(DeleteDepartmentAction(department)))
  }

  const handelEditDepartment = () => {
    handelEdit(selectedRows,
        departments,
        setIsEditDepartmentModalOpen,
        setSelectedDepartment,
        "يرجى اختيار قسم واحد لتعديله")
  }



  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(CreateDepartmentAction(values))
        .then(() => {
          setSubmitting(false);
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          console.error("Error creating department:", error);
        });
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
        <div className={"flex flex-col sm:flex-row flex-wrap justify-between p-10  font-family-primary"}>
          <div className={"w-[25%]"}>
            <TreeComponent data={departments} title={"الأقسام"}  onCheck={setSelectedRows}
                           selectedRows={selectedRows}
                           className={"w-[90%]"}
            />
          </div>
          <div className={"w-[72%] flex flex-col gap-2"}>
            <div className={"flex justify-between"}>
              <text className={"text-title"}> اضافة قسم</text>
              <BtnsIcons
                  className={"flex justify-end"}
                  editIcon={true}
                  handelEditIcon={handelEditDepartment}
                  deleteIcon={true}
                  handelDeleteIcon={handelDeleteDepartments}
                  tipDeleteIcon={"حذف الأقسام المحددة"}
                  tipEditIcon={"تعديل القسم المحدد"}
              />
            </div>
            <div className={"w-[90%] py-14"}>
              <Formik
                  initialValues={{ name: "", supervisor: "" }}
                  validationSchema={DepartmentSchema}
                  onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, setFieldValue }) => (
                    <Form className="">
                      <div className={"flex gap-10"}>
                        <div className={"w-[45%]"}>
                          <TextInput
                              classNameInput={"rounded-[12px] shadow-xl shadow-[#A6CDD766]"}
                              component={TextInput}
                              name="name"
                              title="اسم القسم"
                              error={touched.name && errors.name}
                              onChange={(e) => setFieldValue("name", e.target.value)}
                          />
                        </div>
                        <div className={"w-[45%] h-full"}>
                          <DefaultSelect
                              component={DefaultSelect}
                              name="supervisor"
                              title="اسم المدير"
                              className={"rounded-[12px]"}
                              classNameSelect={"select-arrow-left rounded-[12px] py-2 shadow-xl shadow-[#A6CDD766]"}
                              error={touched.supervisor && errors.supervisor}
                              options={supervisors}
                              onChange={(e) => setFieldValue("supervisor", e.target.value)}
                          />
                        </div>
                      </div>
                      <DefaultBtn
                          className={"my-10 justify-center"}
                          classBtn={"bg-primary-btn text-primary w-40 rounded-[12px] shadow-xl shadow-[#A6CDD766]"}
                          title={"اضافه قسم"}
                          type="submit"
                          disabled={isSubmitting}
                      />
                    </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

        <EditDepartmentModal
            isModalOpen={isEditDepartmentModalOpen}
            onClose={() => setIsEditDepartmentModalOpen(false)}
            editData={editData}
        />
      </>
  );
}

export default AddDepartmentTap;
