import React from 'react';
import DefaultModal from "../DefaultModal";
import TapsComponent from "../../Components/Taps.component";
import DataTableRows from "../../Tables/DataTableRows";
import {useSelector} from "react-redux";

function RetweetModal(props) {
    const isLoading = useSelector(store => store.retweet.isLoading)
    return (
        <DefaultModal classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={"رتويت"}
                secondTapTitle={"حذف رتويت"}
                firstTapComponent={
                    <div className={"py-4"}>
                        <DataTableRows key={"retweet"} spinner={isLoading} selectedAccounts={props.selectedAccounts} type={"retweet"}  thirdBtnTitle={"رتويت"} />
                    </div>
                }
                SecondTapComponent={
                    <div className={"py-4"}>
                        <DataTableRows key={"delete-retweet"} spinner={isLoading} selectedAccounts={props.selectedAccounts} type={"delete-retweet"} a
                                       thirdBtnTitle={"حذف الرتويت"}/>
                    </div>                }
            />
        </DefaultModal>
    );
}

export default RetweetModal;