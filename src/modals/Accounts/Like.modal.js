import React from 'react';
import TapsComponent from "../../Components/Taps.component";
import DataTableRows from "../../Tables/DataTableRows";
import DefaultModal from "../DefaultModal";
import {useSelector} from "react-redux";

function LikeModal({type= 'tweeter',...props}) {
    const isLoading = useSelector(store => store.like.isLoading)
    return (
        <DefaultModal classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={"لايك"}
                secondTapTitle={"حذف اللايك"}
                firstTapComponent={
                    <div className={"py-4"}>
                        <DataTableRows key={"like"} spinner={isLoading} selectedAccounts={props.selectedAccounts} type={type === 'insta' ? "like-insta" :"like"}  thirdBtnTitle={"لايك"} />
                    </div>
                }
                SecondTapComponent={
                    <div className={"py-4"}>
                        <DataTableRows key={"delete-like"} spinner={isLoading} selectedAccounts={props.selectedAccounts}
                                       type={type === 'insta' ? "delete-like-insta" :"delete-like"}
                                       thirdBtnTitle={"حذف اللايك"}/>
                    </div>
                }
            />
        </DefaultModal>
    );
}

export default LikeModal;