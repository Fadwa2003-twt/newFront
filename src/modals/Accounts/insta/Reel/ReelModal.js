import React, {useEffect, useState} from 'react';
import DefaultModal from "../../../DefaultModal";
import TapsComponent from "../../../../Components/Taps.component";
import AddTweet from "../../AddTweets/components/AddTweet";
import DeleteTweets from "../../AddTweets/components/DeleteTweets";
import AddReel from "./components/AddReel";
import DeleteReels from "./components/DeleteReels";

function ReelModal(props) {
    const [isDeleteTweetsModel, setIsDeleteTweetsModel] = useState(false);
    const [checkTweetsDelete, setCheckTweetsDelete] = useState(false);
    const [checkTweetsLinksDelete, setCheckTweetsLinksDelete] = useState(false);
    const type = props.type || "";

    return (
        <DefaultModal classNameModal={"w-full md:w-[40%] border-primary rounded-[11px] shadow-lg"} isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <TapsComponent
                paddingCover={'0'}
                width={"100%"}
                className={"p-5"}
                firstTapTitle={" اضافة ريل"}
                secondTapTitle={"حذف ريل"}
                firstTapComponent={
                    <AddReel onClose={props.onClose}
                              accountsIds={props.selectedAccounts}
                              type={type}
                    />
                }
                SecondTapComponent={
                    <DeleteReels
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

export default ReelModal;