import {useDispatch, useSelector} from "react-redux";
import DefaultModal from "../DefaultModal";
import {Form, Formik} from "formik";
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import React, {useEffect, useState} from "react";
import FolderUploader from "../../Components/Supcomponents/Forms/FolderUploader";
import CreateCategoryAction from "../../redux/action/Category/CreateCategory.action";
import GetCategoriesAction from "../../redux/action/Category/GetCategories.action";
import GetEmployeesAction from "../../redux/action/Employee/GetEmployees.action";
import EditCategoryAction from "../../redux/action/Category/EditCategory.action";

function EditContentCategoryModal(props) {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.data);
    const [acceptedFiles, setAcceptedFiles] = useState([]);

    const onDrop = (files = {}) => {
        setAcceptedFiles(files);
    };
    const handleSubmit = (valuesCategory) => {
        const values = {...valuesCategory, textFiles:acceptedFiles,id:props.category._id};
        dispatch(EditCategoryAction(values)).then(() => {
            props.onClose()
        })
    }

    useEffect(() => {
        dispatch(GetEmployeesAction({limit:100}))
    }, []);
    console.log(props.category)
    return (
        <DefaultModal
            classNameContener={"bg-white bg-opacity-50"}
            classNameModal={
                "w-full md:w-4/12 font-family-primary shadow shadow-[#A6CDD7CC]"
            }
            isModalOpen={props.isModalOpen}
            onClose={props.onClose}
            isTitle={true}
            title={"تعديل صنف محتوى"}
        >
            <Formik enableReinitialize={true} initialValues={{ name: props.category?.name, supervisor:props.category?.supervisor?._id}} onSubmit={handleSubmit}>
                {({ isSubmitting,values, errors, touched, setFieldValue }) => (
                    <Form className="p-5">
                        <div
                            className={
                                "flex flex-wrap flex-col md:flex-row  items-center justify-between"
                            }
                        >
                            <div className={"w-full px-5 sm:px-0 sm:w-[48%]"}>
                                <TextInput
                                    component={TextInput}
                                    classNameInput={"rounded-[6px]"}
                                    name="name"
                                    value={values.name}
                                    title="اسم التصنيف"
                                    error={touched.name && errors.name}
                                    onChange={(e) => setFieldValue("name", e.target.value)}
                                />
                            </div>
                            <div className={"w-full px-5 sm:px-0 sm:w-[48%]"}>
                                <DefaultSelect
                                    component={DefaultSelect}
                                    value={values.supervisor}
                                    className={"rounded-[6px]"}
                                    name="supervisor"
                                    title="المشرف"
                                    classNameSelect={"select-arrow-left py-2"}
                                    error={touched.supervisor && errors.supervisor}
                                    options={employees}
                                    onChange={(e) => setFieldValue("supervisor", e.target.value)}
                                />
                            </div>
                            <div className="w-full mt-3">
                                <div className={"flex gap-2 items-baseline"}>
                                    <i className="fa-solid fa-file"></i>
                                    <text className={"text-lg"}>اضافة ملفات اخرى</text>
                                </div>
                                <FolderUploader acceptedFiles={acceptedFiles} onDrop={onDrop}/>
                            </div>
                        </div>
                        <div className={"flex gap-1 flex-row-reverse mt-10 mb-5 "}>
                            <DefaultBtn
                                classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                title={"حفظ"}
                                type="submit"
                                disabled={isSubmitting}
                            />
                            <DefaultBtn
                                classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                                title={"الغاء"}
                                onClick={props.onClose}
                                type="button"
                                disabled={isSubmitting}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </DefaultModal>
    );
}

export default EditContentCategoryModal;