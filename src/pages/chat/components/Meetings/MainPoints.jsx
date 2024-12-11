import React, {useState} from 'react';
import DefaultModal from "../../../../modals/DefaultModal";
import DeleteIconBtn from "../../../../Components/Supcomponents/Buttons/DeleteIconBtn";
import EditIconBtn from "../../../../Components/Supcomponents/Buttons/EditIconBtn";
import AddIcon from "@mui/icons-material/Add";

const CardMainPoint = (props) => {
    const [selectChecked,setSelectChecked] = useState(false)
    return (
        <div className={"bg-white rounded-lg flex p-2 items-center gap-3"}>
            <input type={"checkbox"} name={""} checked={selectChecked} onChange={() => {setSelectChecked(!selectChecked)}}/>
            <p>{props.text}</p>
        </div>
    )
}

function MainPoints(props) {
    return (
        <DefaultModal
            classNameModal={"w-full md:w-[35%] border border-[#49869633] rounded-2xl px-10 py-8"}
            isModalOpen={props.isModalOpen}
            onClose={props.onClose}
            isTitle={false}
        >
            <div className={"w-full flex flex-col gap-4 justify-center"}>
                <div className={"w-full flex justify-between"}>
                    <p className={"text-primary"}>النقاط الاساسية التي ذكرت بالاجتماع </p>
                    <div className={"flex gap-2"}>
                        <EditIconBtn />
                        <DeleteIconBtn />
                    </div>
                </div>
                <div className={"bg-[#A6CDD733] rounded-2xl flex flex-col gap-3 px-10 py-4"}>
                    <CardMainPoint text={"استخدام برامج سهلة التعديل"}/>
                    <CardMainPoint text={"استخدام برامج سهلة التعديل"}/>
                    <CardMainPoint text={"استخدام برامج سهلة التعديل"}/>

                    <div className={"bg-[#49869626] flex p-2 items-center rounded-lg cursor-pointer"}>
                        <AddIcon/>
                        <p className={"text-primary"}>إضافة ملاحظة جديدة..</p>
                    </div>
                </div>
            </div>
        </DefaultModal>
    );
}

export default MainPoints;