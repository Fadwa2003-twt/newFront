import React, {useEffect, useState} from 'react';
import DefaultModal from "../DefaultModal";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import DefaultFileInput from "../../Components/Supcomponents/inputs/DefaultFileInput";
import {useDispatch, useSelector} from "react-redux";
import GetCategoriesAccountAction from "../../redux/action/CategoriesAccount/GetCategoriesAccount.action";
import GetEmployeesAction from "../../redux/action/Employee/GetEmployees.action";
import {validationSchemaAccountsFile} from "../../validationSchema";
import CreateAccountsFileAction from "../../redux/action/Account/CreateAccountsFile.action";
import {ErrorMessage, Form, Formik} from "formik";
import CreateAccountsInstaFileAction from "../../redux/action/Account/CreateAccountsInstaFile.action";
import GetInstaCategoriesAccountAction from "../../redux/action/CategoriesAccount/GetInstaCategoriesAccount.action";
import Spinner from "../../Components/Supcomponents/Buttons/Spinner";

function AddAccountModal({type = "tweeter",...props}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const user =
        useSelector((state) => state.user) ||
        JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const [errorFile, setErrorFile] = useState();
    const categoriesAccount = useSelector(
        (state) => state.categoriesAccount.data
    );
    const categoriesInsta = useSelector((state) => state.categoriesInstaAccount.data);
    const employees = useSelector((state) => state.employees.data);
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        if (type === "insta") {
            dispatch(GetCategoriesAccountAction({page: 1}));
        }else{
            dispatch(GetInstaCategoriesAccountAction({page: 1}));
        }
        dispatch(GetEmployeesAction({ page: 1 }));
    }, []);

    const onChangeFunction = (event) => {
        console.log(event)
        setSelectedFile(event.target.files[0]);
    };
    const SubmitFunction = (values) => {
        if (!selectedFile) {
            setErrorFile("يرجى اضافة ملف");
            return;
        }
        if (type === "insta") {
            setIsLoading(true)
            dispatch(
                CreateAccountsInstaFileAction({
                    Category: values.Category,
                    csvFile: selectedFile,
                    supervisor: values.supervisor,
                })
            ).then(() => {
                props.onClose()
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            });
        }else{
            setIsLoading(true)
            dispatch(
                CreateAccountsFileAction({
                    Category: values.Category,
                    csvFile: selectedFile,
                    supervisor: values.supervisor,
                })
            ).then(() => {
                props.onClose()
                setIsLoading(false)
            }).catch(() => {
                setIsLoading(false)
            });
        }
    };
    return (
        <DefaultModal classNameModal={"w-full md:w-[28%]"} isModalOpen={props.isModalOpen} title={"اضافة حساب"} onClose={props.onClose} >
            <Formik
                initialValues={{
                    Category: "",
                    csvFile: selectedFile,
                    supervisor: "",
                }}
                validationSchema={validationSchemaAccountsFile}
                onSubmit={SubmitFunction}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                  }) => (
            <Form className="flex flex-col py-15 ">
                <div className={"inputs w-full px-3 flex flex-col items-centers gap-2.5"}>
                    <DefaultFileInput
                        name="csvFile"
                        accept=".csv"
                        onChange={(event) => onChangeFunction(event)}
                        value={selectedFile}
                        titleBoxPrimary={" ملف CSV"}
                        title=" لا يوجد ملفات... "
                        fullWidth
                    />
                    {errorFile ? (
                        <div className="text-red-500 mb-1">{errorFile}</div>
                    ) : (
                        <></>
                    )}
                    <DefaultSelect options={type === "insta" ? categoriesInsta: categoriesAccount} className={"w-full rounded-[11px]"} classNameSelect={"select-arrow-left py-2 "}
                                   name="Category" value={values.Category} onChange={handleChange} title={"اختر فئة"}/>
                    <ErrorMessage name="Category">
                        {(msg) => <div className="text-red-500 mb-1">{msg}</div>}
                    </ErrorMessage>
                    <DefaultSelect options={employees} className={"w-full rounded-[11px]"} classNameSelect={"select-arrow-left py-2"}
                                   name="supervisor" value={values.supervisor} onChange={handleChange} title={"اسم الموظف المسؤول"}/>
                </div>
                {
                    isLoading?
                        <DefaultBtn type={"button"} className={"mb-10 mt-3 justify-center "}>
                            <Spinner/>
                        </DefaultBtn>

                        : <DefaultBtn type={"submit"} className={"mb-10 mt-3 justify-center "} title={"رفع الحسابات"}/>
                }
            </Form>
                )}
            </Formik>
        </DefaultModal>
    );
}

export default AddAccountModal;