import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import AddTweet from "./components/AddTweet";
import DeleteTweets from "./components/DeleteTweets";
import createTweetsAccountsAction from "../../../redux/action/Reply/CreateReply.action";
import CreateTweetForPublisherAction from "../../../redux/action/TweeForPublisher/CreateTweetForPublisher.action";
import DefaultModal from "../../DefaultModal";
import TapsComponent from "../../../Components/Taps.component";
import HomeTap from "../../../Components/HomeComponents/Taps/Home.tap";
import AddDepartmentTap from "../../../Components/HomeComponents/Taps/AddDepartment.tap";
import AddNewEmployeeTap from "../../../Components/HomeComponents/Taps/AddNewEmployee.tap";

function AddTweetsModal({typeAccounts="tweeter",...props}) {
    const [isDeleteTweetsModel, setIsDeleteTweetsModel] = useState(false);
    const [checkTweetsDelete, setCheckTweetsDelete] = useState(false);
    const [checkTweetsLinksDelete, setCheckTweetsLinksDelete] = useState(false);
    const type = props.type || "";
    useEffect(() => {
        console.log(typeAccounts)
    },[])

    return (
        <DefaultModal classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={" اضافة تويت"}
                secondTapTitle={"حذف تويت"}
                firstTapComponent={
                    <AddTweet onClose={props.onClose}
                              accountsIds={props.selectedAccounts}
                              type={type}
                              typeAccounts={typeAccounts}
                    />
                }
                SecondTapComponent={
                    <DeleteTweets
                        selectedAccounts={props.selectedAccounts}
                        typeAccounts={props.typeAccounts}
                        onSubmit={() => {}}
                        handelClose={props.onClose}
                        isDelete={isDeleteTweetsModel}
                        onChangeCheckTweetsDelete={() => setCheckTweetsDelete(!checkTweetsDelete)}
                        onChangeCheckTweetsLinksDelete={() => setCheckTweetsLinksDelete(!checkTweetsLinksDelete)}
                        checkTweetsLinksDelete={checkTweetsLinksDelete}
                    />
                }
            />
        </DefaultModal>
    );
}

export default AddTweetsModal;
