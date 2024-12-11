import React, {useEffect, useState} from 'react';
import { Form, Formik } from "formik";
import FolderUploader from "../../../../Components/Supcomponents/Forms/FolderUploader";
import Spinner from "../../../../Components/Supcomponents/Buttons/Spinner";
import {useDispatch, useSelector} from "react-redux";
import DefaultFileInput from "../../../../Components/Supcomponents/inputs/DefaultFileInput";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import CreateTweetForPublisherAction from "../../../../redux/action/TweeForPublisher/CreateTweetForPublisher.action";
import createTweetsAccountsAction from "../../../../redux/action/Tweet/CreateTweetsAccounts.action";
import CreatePostsInstaAction from "../../../../redux/action/insta/CreatePostsInsta.action";

function AddTweet({typeAccounts = "tweeter",...props}) {
    const isLoading = useSelector(store => store.tweet.isLoading)
    const accounts = useSelector((state) => state.accounts.data);
    const [selectedFileTweets, setSelectedFileTweets] = useState(null);
    const [images, setImages] = useState([]);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const type = props.type || "";
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        normalTweet: "",
        textFile: "",
        image: "",
        textFileTweet: "",
    });

    const onDrop = (files = {}) => {
        setAcceptedFiles(files);
    };

    const handleSubmitAddTweet = (values) => {
        console.log(typeAccounts)
        console.log(selectedFileTweets);
        if (values.normalTweet || selectedFileTweets) {
            const filteredAccountsNames = accounts
                .filter((account) => props.accountsIds.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);
            if (type === "publisher") {
                dispatch(
                    CreateTweetForPublisherAction({
                        textFileTweet: selectedFileTweets,
                        images: acceptedFiles,
                        accounts: filteredAccountsNames, // استخدام أسماء الحسابات المفلترة
                    })
                ).then(() => {
                    props.onClose();
                });
            } else {
                if(typeAccounts === "insta"){
                    dispatch(
                        CreatePostsInstaAction(dispatch,{
                            textFileTweet: selectedFileTweets,
                            images: acceptedFiles,
                            accounts: filteredAccountsNames, // استخدام أسماء الحسابات المفلترة
                        })
                    ).then(() => {
                        props.onClose();
                    });
                }else {
                    dispatch(
                        createTweetsAccountsAction({
                            textFileTweet: selectedFileTweets,
                            images: acceptedFiles,
                            accounts: filteredAccountsNames, // استخدام أسماء الحسابات المفلترة
                        })
                    ).then(() => {
                        props.onClose();
                    });
                }
            }
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                textFile: "ملف التغريدة او حقل النص مطلوب",
                normalTweet: "ملف التغريدة او حقل النص مطلوب",
            }));
        }
    };


    const onChangeFunctionFile = (event) => {
        console.log("change Function")
        setSelectedFileTweets(event.target.files[0]);
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.addEventListener("loadend", function () {
            document.getElementById("text").innerText = reader.result;
        });
        reader.readAsText(new Blob([file]));
    };

    useEffect(() => {
        const imagesArray = [];
        for (let i = 0; i < acceptedFiles.length; i++) {
            const file = acceptedFiles[i];
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                imagesArray.push(reader.result);
                if (imagesArray.length === acceptedFiles.length) {
                    setImages(imagesArray);
                }
            };
        }
    }, [acceptedFiles]);
    return (
        <Formik
            initialValues={{
                normalTweet: "",
            }}
            onSubmit={handleSubmitAddTweet}
        >
            {({ handleChange, values, touched }) => (
                <div className="py-1">
                    <div className="w-full">
                        <Form className="bg-white p-4">
                            <div className={"flex flex-col gap-2"}>
                                <div className={" py-5 px-3 flex flex-col gap-2"}>
                                    <div className="flex flex-col gap-2">
                                        <div className={"flex gap-2 items-baseline"}>
                                            <i className="fas fa-file"></i>
                                            <text className={"text-lg"}>فورمات الملف المطلوب:</text>
                                        </div>
                                        <p className="text-red-600">.../ tweet 1 / tweet 2</p>
                                    </div>
                                    <DefaultFileInput
                                        name="textFileTweet"
                                        accept=".txt"
                                        onChange={(event) => onChangeFunctionFile(event)}
                                        value={selectedFileTweets}
                                        titleBoxPrimary={" ملف txt"}
                                        title=" لا يوجد ملفات... "
                                        fullWidth
                                    />
                                    {errors.textFile ? (
                                        <div className="text-red-600 mb-3">{errors.textFile}</div>
                                    ) : (<></>)}
                                </div>

                                <div className={"flex flex-col gap-1 p-2"}>
                                    <div className={"flex flex-col gap-2"}>
                                        <div className={"flex gap-2 items-baseline"}>
                                            <i className="fa-solid fa-eye"></i>
                                            <text className={"text-lg"}> معاينة الملف النصي</text>
                                        </div>
                                        <div className={"p-3 bg-white shadow-sm border-primary rounded-[11px]"}>
                                            {
                                                selectedFileTweets ?
                                                    <pre id='text' className='mt-2 mb-2 text-base text-wrap'></pre>
                                                    : <pre className='mt-2 mb-2 text-base text-wrap text-center '> لا يوجد ملف </pre>
                                            }

                                        </div>

                                    </div>
                                </div>
                                <div className={"flex flex-col gap-1 p-2"}>
                                    <div className="">
                                        <div className={"flex gap-2 items-baseline"}>
                                            <i className="fa-solid fa-image"></i>
                                            <text className={"text-lg"}>مجلد صور</text>
                                        </div>
                                        <FolderUploader acceptedFiles={acceptedFiles} onDrop={onDrop}/>
                                    </div>
                                    <div className={"flex flex-wrap justify-center"}>
                                        {images.map((image, index) => (
                                            <img key={index} src={image} alt={`Preview ${index}`}
                                                 className="w-36 h-24 m-1"/>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className={"flex gap-1 flex-row-reverse mt-10 "}>
                                    <DefaultBtn
                                        classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                        title={isLoading ? <Spinner color={"#fff"}/> : "حفظ"}
                                        type="submit"
                                    />

                                <DefaultBtn
                                    classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                                    title={"الغاء"}
                                    onClick={props.onClose}
                                    type="button"
                                />
                            </div>

                        </Form>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default AddTweet;
