import React from 'react';
import DefaultModal from "../../DefaultModal";
import TapsComponent from "../../../Components/Taps.component";
import DataTableRows from "../../../Tables/DataTableRows";
import AddReply from "./components/AddReply";
import DeleteReply from "./components/DeleteReply";

function ReplyModal(props) {
    return (

        <DefaultModal classNameModal={"w-full md:w-[30%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={"اضافة تعليق"}
                secondTapTitle={"حذف تعليق"}
                firstTapComponent={<AddReply selectedAccounts={props.selectedAccounts} />}
                SecondTapComponent={<DeleteReply selectedAccounts={props.selectedAccounts} />}
            />
        </DefaultModal>
    );
}

export default ReplyModal;