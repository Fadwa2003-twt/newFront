import React, {useState} from 'react';
import {useSelector} from "react-redux";
import DefaultModal from "../../../../DefaultModal";
import DataTableRows from "../../../../../Tables/DataTableRows";
import DefaultBtn from "../../../../../Components/Supcomponents/Buttons/DefaultBtn";
function DeleteStoriesLinks(props) {
    const [textFileBrows,setTextFileBrows] = useState()
    const fileInputRef = React.createRef();
    const isLoading = useSelector(store => store.tweet.isLoading)
    const openBrowsAndSelectFile = () => {
        // Trigger the hidden file input element
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0]; // Get the first selected file
        setTextFileBrows(selectedFile);
    };

    return (
        <DefaultModal title={"الستوري التي تود حذفها"} classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-non"}
        >
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className={"modal-body p-4"}>
                <DataTableRows spinner={isLoading} selectedAccounts={props.selectedAccounts} type={"delete-story-insta"} a thirdBtnTitle={"حذف"} />
            </div>
            <div className="modal-footer p-4">
                <div className={"flex gap-1 flex-row-reverse"}>
                    <DefaultBtn
                        classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                        title={"الغاء"}
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
            </div>
        </DefaultModal>
    );
}

export default DeleteStoriesLinks;