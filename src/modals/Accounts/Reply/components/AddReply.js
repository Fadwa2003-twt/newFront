import React, {useState} from 'react';
import DefaultFileInput from "../../../../Components/Supcomponents/inputs/DefaultFileInput";
import {useDispatch, useSelector} from "react-redux";
import CreateReplyAction from "../../../../redux/action/Reply/CreateReply.action";
import {aleartsToast} from "../../../../alearts/alearts";
import {ErrorMessage, Form, Formik} from "formik";
import {validationSchemaReplyAccounts} from "../../../../validationSchema";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import TextInput from "../../../../Components/Supcomponents/inputs/TextInput";
import Spinner from "../../../../Components/Supcomponents/Buttons/Spinner";

function AddReply(props) {
    const dispatch = useDispatch();
    const [textFile, setTextFile] = useState();
    const accounts = useSelector((state) => state.accounts.data);
    const isLoading = useSelector((store) => store.reply.isLoading);
    const onChangeFileInput = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setTextFile(selectedFile);
        }
    };
    const handelSubmit = (values) => {
        if (textFile) {
            const accountsName = accounts
                .filter((account) => props.selectedAccounts.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);
            console.log({
                url: values.url,
                textFile: textFile,
                accounts: accountsName,
            });
            dispatch(
                CreateReplyAction({
                    url: values.url,
                    textFile: textFile,
                    accounts: accountsName,
                })
            );
        } else {
            aleartsToast("error", "يرجى اضافة ملف نصي بالتعليق");
        }
    };
    return (
        <div className={"py-4 flex flex-col gap-2"}>
            <Formik
                initialValues={{url: ""}}
                onSubmit={handelSubmit}
                validationSchema={validationSchemaReplyAccounts}
            >
                {({handleChange, values, touched}) => (
                    <Form>
                        <div className={"flex flex-col gap-4"}>
                        <DefaultFileInput
                            name="textFileReply"
                            accept=".txt"
                            onChange={(event) => onChangeFileInput(event)}
                            value={textFile}
                            titleBoxPrimary={" ملف txt"}
                            title=" لا يوجد ملفات... "
                            fullWidth
                        />
                        <div className={"flex flex-col"}>
                            <TextInput
                                component={TextInput}
                                classNameInput={"rounded-[11px]"}
                                value={values.url}
                                onChange={handleChange}
                                name="url"
                                title="رابط التغريدة"
                                disabled={false}
                            />
                            <ErrorMessage name="url">
                                {(msg) => <div className="text-danger mb-3 mx-5">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        </div>

                        <div className={"flex gap-1 flex-row-reverse mt-10 "}>
                            {isLoading ? (
                                <Spinner addClass="bg-blue-200 text-blue-800"/>
                            ) : (
                                <DefaultBtn
                                    classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                    title={"حفظ"}
                                    type="submit"
                                />
                            )}

                            <DefaultBtn
                                classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                                title={"الغاء"}
                                onClick={props.handelAddTweet}
                                type="button"
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddReply;