import React from 'react';
import DefaultModal from "../DefaultModal";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import Spinner from "../../Components/Supcomponents/Buttons/Spinner";
import {useDispatch, useSelector} from "react-redux";
import UnlockAction from "../../redux/action/Account/Unlock.action";
import {Form, Formik} from "formik";
import {validationSchemaUnlock} from "../../validationSchema";

function UnLockModal(props) {
    const dispatch = useDispatch()
    const isLoading = useSelector(store => store.unlock.isLoading)
    const accounts = useSelector((state) => state.accounts.data);
    const handelSubmitUnlock = (values) => {
        const accountsNames = accounts
            .filter((account) => props.selectedAccounts.includes(account._id)) // تعديل هنا لاستخدام account_id
            .map((account) => account.name);

        dispatch(UnlockAction({accounts: accountsNames, type: values.type}))
    }
    return (
        <DefaultModal classNameModal={"w-full md:w-[30%] border-primary rounded-[11px] shadow-lg"}
                      isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <Formik initialValues={{
                type:""
            }} onSubmit={handelSubmitUnlock}
                    validationSchema={validationSchemaUnlock}>
                {({handleChange, values, touched, errors}) => (
                    <Form>
            <div className={"flex flex-col p-4"}>
                <div className={"flex gap-3 items-center "}>

                    <div className="flex items-center w-[48%] ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input id="bordered-radio-1" type="radio" onChange={handleChange} value={"0"} name="type"
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="bordered-radio-1"
                               className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">النوع
                            الأول</label>
                    </div>
                    <div
                        className="flex items-center  w-[48%] ps-4 border border-gray-200 rounded dark:border-gray-700">
                        <input checked id="bordered-radio-2" type="radio" onChange={handleChange} value={"1"} name="type"
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="bordered-radio-2"
                               className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">النوع
                            الثاني</label>
                    </div>
                </div>
                <div className={"flex gap-1 flex-row-reverse mt-2"}>
                    <DefaultBtn
                        classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                        title={"حفظ"}
                        type="submit"
                    />

                    <DefaultBtn
                        classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                        title={"الغاء"}
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
            </div>
                    </Form>
                    )}
            </Formik>


        </DefaultModal>
    );
}

export default UnLockModal;