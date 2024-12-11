import React from 'react';
import DefaultModal from "../DefaultModal";
import {Form, Formik} from "formik";
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import {useDispatch, useSelector} from "react-redux";
import CreateCategoryAccount from "../../redux/action/CategoriesAccount/CreateCategoryAccount.action"
import CreateInstaCategoryAccount from "../../redux/action/CategoriesAccount/CreateInstaCategoryAccount.action"
import EditInstaCategoryAccountAction from "../../redux/action/CategoriesAccount/EditInstaCategoryAccount.action";
import EditCategoryAccountAction from "../../redux/action/CategoriesAccount/EditCategoryAccount.action";

function EditCategoryAccountModal({ isModalOpen, onClose,category,setCategory,type="tweeter" }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoriesAccount.data);
    const categoriesInsta = useSelector((state) => state.categoriesInstaAccount.data);

    const handleSubmit = (values) => {
        if(type === "insta") {
            dispatch(EditInstaCategoryAccountAction({...values,id:category._id})).then(() =>{
                setCategory({})
                onClose()
            })
        }else {
            dispatch(EditCategoryAccountAction({...values,id:category._id})).then(() => {
                setCategory({})
                onClose()
            })
        }
    }
    return (
        <DefaultModal
            classNameContener={"bg-white bg-opacity-50"}
            classNameModal={"w-full md:w-4/12 font-family-primary shadow shadow-[#A6CDD7CC]"}
            isModalOpen={isModalOpen}
            onClose={onClose}
            isTitle={true}
            title={"تعديل تصنيف"}
        >
            <Formik
                initialValues={{ name: category?.name || "", parent: category?.parent?._id || ""}}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, setFieldValue,values }) => (
                    <Form className="p-5">
                        <div className={"flex flex-wrap flex-col md:flex-row  items-center justify-between"}>
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
                                    name="parent"
                                    optionSelecte={values.parent}
                                    className={"rounded-[6px]"}
                                    classNameSelect={"select-arrow-left py-2"}
                                    error={touched.parent && errors.parent}
                                    options={type === "insta" ? categoriesInsta :categories}
                                    value={values.parent}
                                    onChange={(e) => setFieldValue("parent", e.target.value)}
                                />

                            </div>
                        </div>
                        <div className={"flex gap-1 flex-row-reverse mt-10 mb-5"}>
                            <DefaultBtn
                                classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                title={"حفظ"}
                                type="submit"
                                disabled={isSubmitting}
                            />
                            <DefaultBtn
                                classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                                title={"الغاء"}
                                onClick={onClose}
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

export default EditCategoryAccountModal;