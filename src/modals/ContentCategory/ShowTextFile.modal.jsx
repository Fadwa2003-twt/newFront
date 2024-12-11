import React, {useEffect, useState} from 'react';
import DefaultModal from "../DefaultModal";
import axios from 'axios';
import {rootRoute} from "../../Routes/Root.route";

function ShowTextFileModal({file,isModalOpen,onClose}) {
    const [fileContent, setFileContent] = useState('');
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
        useEffect(() => {
            const filePath = rootRoute + "/files/" + file
            const fetchFile = async () => {
                try {
                    const response = await axios.get(filePath,{
                        headers: { Authorization: `Bearer ${token}` }}); // تأكد من استخدام المسار الصحيح
                    setFileContent(response.data);
                } catch (error) {
                    console.error('Error fetching file:', error);
                }
            };

            fetchFile();
        }, [file]);
    return (
        <DefaultModal
            classNameContener={"bg-white bg-opacity-50"}
            classNameModal={
                "w-full md:w-4/12 font-family-primary shadow shadow-[#A6CDD7CC]"
            }
            isModalOpen={isModalOpen}
            onClose={onClose}
            isTitle={true}
            title={
                <div className={"flex gap-2 items-baseline"}>
                    <i className={"fa fa-file"}></i>
                    <span>{file.replace(/^.*[\\\/]/, '')}</span>
                </div>
            }
        >
            <div className={"p-5 max-h-[70vh] overflow-y-auto"}>
                <pre className="whitespace-pre-wrap break-words">{fileContent}</pre>
            </div>

        </DefaultModal>
    );
}

export default ShowTextFileModal;