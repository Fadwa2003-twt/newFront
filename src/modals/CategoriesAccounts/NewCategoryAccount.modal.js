import React from "react";
import DefaultModal from "../DefaultModal";
import { Form, Formik } from "formik";
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultSelect from "../../Components/Supcomponents/inputs/DefaultSelect";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import { useDispatch, useSelector } from "react-redux";
import CreateCategoryAccount from "../../redux/action/CategoriesAccount/CreateCategoryAccount.action";
import CreateInstaCategoryAccount from "../../redux/action/CategoriesAccount/CreateInstaCategoryAccount.action";

function NewCategoryAccountModal({ isModalOpen, onClose, type = "tweeter" }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesAccount.data);
  const categoriesInsta = useSelector(
      (state) => state.categoriesInstaAccount.data
  );

  const handleSubmit = (values, { resetForm }) => {
    console.log(type);

    if (type === "insta") {
      console.log(values);

      dispatch(CreateInstaCategoryAccount(values)).then(() => {
        resetForm();
        onClose();
      });
    } else {
      dispatch(CreateCategoryAccount(values)).then(() => {
        resetForm();
        onClose();
      });
    }
  };
  return (
      <DefaultModal
          classNameContener={"bg-white bg-opacity-50"}
          classNameModal={
            "w-full md:w-4/12 font-family-primary shadow shadow-[#A6CDD7CC]"
          }
          isModalOpen={isModalOpen}
          onClose={onClose}
          isTitle={true}
          title={"انشاء تصنيف"}
      >
        <Formik initialValues={{ name: "", parent: "" }} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                        title="اسم التصنيف"
                        error={touched.name && errors.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                    />
                  </div>
                  <div className={"w-full px-5 sm:px-0 sm:w-[48%]"}>
                    <DefaultSelect
                        component={DefaultSelect}
                        className={"rounded-[6px]"}
                        name="parent"
                        title="تصنيف الاب"
                        classNameSelect={"select-arrow-left py-2"}
                        error={touched.parent && errors.parent}
                        options={type === "insta" ? categoriesInsta : categories}
                        onChange={(e) => setFieldValue("parent", e.target.value)}
                    />
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

export default NewCategoryAccountModal;