import React, {useEffect, useState} from 'react';
import DefaultModal from "../../../DefaultModal";
import TapsComponent from "../../../../Components/Taps.component";
import AddStory from "./components/AddStory";
import DeleteStories from "./components/DeleteStories";

function StoryModal(props) {
    const [isDeleteStoryModel, setIsDeleteStoryModel] = useState(false);
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
                firstTapTitle={" اضافة ستوري"}
                secondTapTitle={"حذف ستوري"}
                firstTapComponent={
                    <AddStory onClose={props.onClose}
                              accountsIds={props.selectedAccounts}
                              type={type}
                    />
                }
                SecondTapComponent={
                    <DeleteStories
                        selectedAccounts={props.selectedAccounts}
                        typeAccounts={props.typeAccounts}
                        onSubmit={() => {}}
                        handelClose={props.onClose}
                        onChangeCheckTweetsDelete={() => setCheckTweetsDelete(!checkTweetsDelete)}
                        onChangeCheckTweetsLinksDelete={() => setCheckTweetsLinksDelete(!checkTweetsLinksDelete)}
                        checkTweetsLinksDelete={checkTweetsLinksDelete}
                    />
                }
            />
        </DefaultModal>
    );
}

export default StoryModal;