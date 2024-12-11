import React from 'react';
import DefaultModal from "../DefaultModal";
import TapsComponent from "../../Components/Taps.component";
import DataTableRows from "../../Tables/DataTableRows";
import {useSelector} from "react-redux";

function FollowModal({type= 'tweeter',...props}) {
    const isLoading = useSelector(store => store.follow.isLoading)
    return (
        <DefaultModal classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={"متابعة"}
                secondTapTitle={"الغاء المتابعة"}
                firstTapComponent={
                <div className={"py-4"} id="follow">
                    <DataTableRows key={"follow"} spinner={isLoading} selectedAccounts={props.selectedAccounts} type={type === 'insta' ? "insta-follow" :"follow"}  thirdBtnTitle={"متابعة"} />
                </div>
                }
                SecondTapComponent={
                <div className={"py-4"} id="unfollow">
                    <DataTableRows key={"unfollow"} spinner={isLoading} selectedAccounts={props.selectedAccounts} type={type === 'insta' ? "insta-unfollow" :"unfollow"} a
                                   thirdBtnTitle={"الغاء المتابعة"}/>
                </div>
                }
            />
        </DefaultModal>
    );
}

export default FollowModal;