import React, {useState} from 'react';
import TextInput from "../../Components/Supcomponents/inputs/TextInput";
import DefaultModal from "../DefaultModal";
import DefaultBtn from "../../Components/Supcomponents/Buttons/DefaultBtn";
import {useDispatch, useSelector} from "react-redux";
import ShowTweetAction from "../../redux/action/Tweet/ShowTweet.action";
import Spinner from "../../Components/Supcomponents/Buttons/Spinner";

function ShowTweetModal(props) {
    const [url,setUrl] = useState("");
    const dispatch = useDispatch()
    const accounts = useSelector((state) => state.accounts.data);
    const isLoading = useSelector(store => store.showTweet.isLoading)
    const handelSubmitShowTweet = () => {
        const accountsNames = accounts
            .filter((account) => props.selectedAccounts.includes(account._id)) // تعديل هنا لاستخدام account_id
            .map((account) => account.name);
        dispatch(ShowTweetAction({accounts: accountsNames, url: url}))
    }
    return (
        <DefaultModal classNameModal={"w-full md:w-[30%] border-primary rounded-[11px] shadow-lg"}
                      isModalOpen={props.isModalOpen} onClose={props.onClose}
                      classNameContener={"bg-none"}>
            <div className={"p-4 flex flex-col gap-3"}>
                <TextInput
                    component={TextInput}
                    classNameInput={"rounded-[6px]"}
                    name="url"
                    value={url}
                    title="رابط التويت"
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className={"flex gap-1 flex-row-reverse mt-2"}>
                    <DefaultBtn
                        classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                        title={isLoading ? <Spinner color={"#fff"}/> : "حفظ"}
                        onClick={handelSubmitShowTweet}
                        type="submit"
                    />

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

export default ShowTweetModal;