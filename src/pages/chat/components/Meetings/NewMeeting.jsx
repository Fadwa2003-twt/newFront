import React from 'react';
import EditIconBtn from "../../../../Components/Supcomponents/Buttons/EditIconBtn";
import DeleteIconBtn from "../../../../Components/Supcomponents/Buttons/DeleteIconBtn";
import DefaultModal from "../../../../modals/DefaultModal";
import TextInput from "../../../../Components/Supcomponents/inputs/TextInput";
import SelecteAutoComplete from "../../../../Components/Supcomponents/inputs/SelecteAutoComplete";
import InputWithIcon from "../../../../Components/Supcomponents/inputs/InputWithIcon";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import DefaultDateInput from "../../../../Components/Supcomponents/inputs/DefaultDateInput";

function NewMeeting(props) {
    return (
        <DefaultModal
            classNameModal={"border border-[#49869633] rounded-2xl px-10 py-8 w-[35%]"}
            isModalOpen={props.isModalOpen}
            onClose={props.onClose}
            isTitle={false}
        >
            <div className={"flex flex-col gap-3"}>
                <p className={"text-lg mb-5"}>انشاء اجتماع</p>
                <TextInput classNmae={"w-full"} title={"عنوان الاجتماع"}/>
                <div className={"flex justify-between"}>
                    <DefaultDateInput className={"w-[47%]"} classNameLabel={"gap-3"} title={"وقت الإجتماع"}
                                   iconClass={"fa-solid fa-calendar"}
                    />
                    <TextInput className={"w-[47%]"} title={"اسم الموظف"}/>
                </div>
                <div className={"btnsNewNotification flex w-full gap-3 mt-6 flex-row-reverse"}>
                    <DefaultBtn title={"حفظ"} classBtn={"w-20 rounded-[6px] bg-[#49869680]"}/>
                    <DefaultBtn title={"الغاء"} type={"button"} onClick={props.onClose}  classBtn={"w-20 rounded-[6px] bg-primary-btn"}/>
                </div>
            </div>
        </DefaultModal>
    );
}

export default NewMeeting;