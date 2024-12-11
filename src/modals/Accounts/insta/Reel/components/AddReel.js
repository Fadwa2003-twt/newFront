import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import DefaultFileInput from "../../../../../Components/Supcomponents/inputs/DefaultFileInput";
import DefaultBtn from "../../../../../Components/Supcomponents/Buttons/DefaultBtn";
import Spinner from "../../../../../Components/Supcomponents/Buttons/Spinner";
import { useDispatch, useSelector } from "react-redux";
import FolderUploader from "../../../../../Components/Supcomponents/Forms/FolderUploader";
import CreateReelAction from "../../../../../redux/action/insta/CreateReel.action";


function AddReel(props) {
    const isLoading = useSelector(store => store.tweet.isLoading);
    const dispatch = useDispatch();
    const [selectedTextFile, setSelectedTextFile] = useState(null);
    const [acceptedFiles, setAcceptedFiles] = useState([]); // يستخدم لكل من الفيديو والصورة
    const [selectedVideoFile, setSelectedVideoFile] = useState(null);
    const [selectedThumbnail, setSelectedThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [textContent, setTextContent] = useState(''); // لتخزين محتوى الملف النصي
    const [errors, setErrors] = useState({
        textFile: "",
        videoFile: "",
        thumbnail: "",
    });

    const handleSubmitAddReel = async (values) => {
        // try {
        //     if (values.normalTweet || selectedFile) {
        //         const accountsName = accountsIds.map((account) => account.name);
        //
        //         // Call CreatePostsInstaAction and pass dispatch as an argument
        //         // If the response is successful, call props.handelAddTweet
        //         const response = await CreateReelAction(dispatch, {
        //             textFileTweet: selectedTextFile,
        //             images: acceptedFiles,
        //             accounts: accountsName,
        //             csvFile: selectedFileReel,
        //         });
        //         if (response && response.status === "success") {
        //             handelAddReel();
        //         } else {
        //             // Handle other types of responses if needed
        //         }
        //     } else {
        //         setErrors((prevErrors) => ({
        //             ...prevErrors,
        //             textFile: "ملف التغريدة أو حقل النص مطلوب",
        //             normalTweet: "ملف التغريدة أو حقل النص مطلوب",
        //         }));
        //     }
        // } catch (error) {
        //     console.error("Error during form submission:", error);
        //     // Handle unexpected errors if needed
        // }
    };

    // للتعامل مع رفع الفيديو باستخدام FolderUploader
    const handleVideoDrop = (files) => {
        setSelectedVideoFile(files[0]); // نفترض أنه يتم رفع فيديو واحد فقط
    };

    // للتعامل مع رفع الصورة المصغرة باستخدام FolderUploader
    const handleThumbnailDrop = (files) => {
        const file = files[0]; // نفترض أنه يتم رفع صورة واحدة فقط
        setSelectedThumbnail(file);

        // إنشاء معاينة للصورة المصغرة
        const reader = new FileReader();
        reader.onload = () => {
            setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // التعامل مع رفع الملف النصي
    const handleTextFileChange = (event) => {
        console.log("change Function")
        console.log(event.target.files)
        setSelectedTextFile(event.target.files[0]);
        const reader = new FileReader();
        const file = event.target.files[0];

        reader.addEventListener("loadend", function () {
            document.getElementById("textFile").innerText = reader.result;
        });
        reader.readAsText(new Blob([file]));
    };

    return (
        <Formik
            initialValues={{}}
            onSubmit={handleSubmitAddReel}
        >
            {({ isSubmitting }) => (
                <div className="py-1">
                    <div className="w-full">
                        <Form className="bg-white p-4">
                            <div className="flex flex-col gap-2">

                                {/* حقل رفع الملف النصي وعرضه */}
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-baseline">
                                            <i className="fa-solid fa-file"></i>
                                            <span className="text-lg">رفع ملف نصي</span>
                                        </div>
                                    </div>
                                    <DefaultFileInput
                                        name="textFileReel"
                                        accept=".txt"
                                        onChange={(event) => handleTextFileChange(event)}
                                        value={selectedTextFile}
                                        titleBoxPrimary={" ملف txt"}
                                        title=" لا يوجد ملفات... "
                                        fullWidth
                                    />
                                    {errors.textFile && (
                                        <div className="text-red-600 mb-3">{errors.textFile}</div>
                                    )}
                                    {/* عرض محتوى الملف النصي */}
                                </div>
                                <div className={"flex flex-col gap-2 p-3"}>
                                    <div className={"flex flex-col gap-2"}>
                                        <div className={"flex gap-2 items-baseline"}>
                                            <i className="fa-solid fa-eye"></i>
                                            <text className={"text-lg"}> معاينة الملف النصي</text>
                                        </div>
                                        <div className={"p-3 bg-white shadow-sm border-primary rounded-[11px]"}>
                                            {
                                                selectedTextFile ?
                                                    <pre id='textFile' className='mt-2 mb-2 text-base text-wrap'></pre>
                                                    :
                                                    <pre className='mt-2 mb-2 text-base text-wrap text-center '> لا يوجد ملف </pre>
                                            }

                                        </div>

                                    </div>
                                </div>

                                {/* حقل رفع ملف الفيديو باستخدام FolderUploader */}
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-baseline">
                                            <i className="fa-solid fa-video"></i>
                                            <span className="text-lg">رفع فيديو</span>
                                        </div>
                                    </div>
                                    <FolderUploader
                                        acceptedFiles={selectedVideoFile ? [selectedVideoFile] : []}
                                        onDrop={handleVideoDrop}
                                    />
                                    {errors.videoFile && (
                                        <div className="text-red-600 mb-3">{errors.videoFile}</div>
                                    )}
                                </div>

                                {/* حقل رفع الصورة المصغرة باستخدام FolderUploader */}
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 items-baseline">
                                            <i className="fa-solid fa-image"></i>
                                            <span className="text-lg">إضافة صورة مصغرة للفيديو</span>
                                        </div>
                                    </div>
                                    <FolderUploader
                                        acceptedFiles={selectedThumbnail ? [selectedThumbnail] : []}
                                        onDrop={handleThumbnailDrop}
                                    />
                                    {errors.thumbnail && (
                                        <div className="text-red-600 mb-3">{errors.thumbnail}</div>
                                    )}
                                    {/* عرض معاينة الصورة المصغرة */}
                                    {thumbnailPreview && (
                                        <div className="flex justify-center">
                                            <img
                                                src={thumbnailPreview}
                                                alt="معاينة الصورة المصغرة"
                                                className="w-36 h-24 m-1"
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className="flex gap-1 flex-row-reverse mt-10">
                                <DefaultBtn
                                    classBtn="bg-primary text-white w-20 rounded-[6px]"
                                    title={isLoading ? <Spinner color="#fff"/> : "حفظ"}
                                    type="submit"
                                />
                                <DefaultBtn
                                    classBtn="bg-primary-btn text-primary w-20 rounded-[6px]"
                                    title="الغاء"
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

export default AddReel;