import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import FolderUploader from "../../../../../Components/Supcomponents/Forms/FolderUploader";
import DefaultBtn from "../../../../../Components/Supcomponents/Buttons/DefaultBtn";
import Spinner from "../../../../../Components/Supcomponents/Buttons/Spinner";
import CreateStoryAction from "../../../../../redux/action/insta/CreateStoryInsta.action";

function AddStory(props) {
    const [isLoading,setIsLoading] = useState(false);
    const accounts = useSelector((state) => state.accounts.data);
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [images, setImages] = useState([]);
    const type = props.type || "";
    const dispatch = useDispatch();

    const onDrop = (files = {}) => {
        setAcceptedFiles(files);
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const filteredAccountsNames = accounts
                .filter((account) => props.accountsIds.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);

            // Call CreatePostsInstaAction and pass dispatch as an argument
            const response = await CreateStoryAction(dispatch, {
                images: acceptedFiles,
                accounts: filteredAccountsNames,
            }).then(() => {
                setIsLoading(false)
                props.onClose();
            }).catch(() =>{
                setIsLoading(false)
            });
            // If the response is successful, call props.handelAddTweet
            if (response && response.status === "success") {
                props.onClose();
            } else {
                // Handle other types of responses if needed
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            // Handle unexpected errors if needed
        }
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
            initialValues={{}}
            onSubmit={handleSubmit}
        >
            {() => (
                <div className="py-1">
                    <div className="w-full">
                        <Form className="bg-white p-4">
                            <div className={"flex flex-col gap-2"}>
                                <div className={"flex flex-col gap-1 p-2"}>
                                    <div className="flex gap-2 items-baseline">
                                        <i className="fa-solid fa-image"></i>
                                        <text className={"text-lg"}>مجلد صور</text>
                                    </div>
                                    <FolderUploader acceptedFiles={acceptedFiles} onDrop={onDrop} />
                                </div>
                                <div className={"flex flex-wrap justify-center"}>
                                    {images.map((image, index) => (
                                        <img key={index} src={image} alt={`Preview ${index}`} className="w-36 h-24 m-1" />
                                    ))}
                                </div>
                            </div>

                            <div className={"flex gap-1 flex-row-reverse mt-10 "}>
                                <DefaultBtn
                                    classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                    title={isLoading ? <Spinner color={"#fff"} /> : "حفظ"}
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

export default AddStory;
