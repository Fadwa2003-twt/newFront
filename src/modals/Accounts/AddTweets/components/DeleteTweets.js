import React, { useState } from "react";
import TextInput from "../../../../Components/Supcomponents/inputs/TextInput";
import { useDispatch, useSelector } from "react-redux";
import DeleteTweetsAction from "../../../../redux/action/Tweet/DeleteTweets.action";
import { aleartsToast } from "../../../../alearts/alearts";
import Spinner from "../../../../Components/Supcomponents/Buttons/Spinner";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import ToggleCheckbox from "../../../../Components/Supcomponents/inputs/ToggleCheckbox";
import AddAccountModal from "../../AddAccount.modal";
import DeleteTweetsLinks from "./DeleteTweetsLinks.modal";

function DeleteTweets(props) {
    console.log(props);
    const [checkTweetsNum, setCheckTweetsNum] = useState(false);
    const [count, setCount] = useState(1); // Default count is 1
    const [errors, setErrors] = useState({ count: "" });
    const accounts = useSelector((state) => state.accounts.data);
    const [urls, setUrls] = useState([""]); // Initialize with one empty URL
    const dispatch = useDispatch();
    const [isOpenDeleteTweetsLinks, setIsOpenDeleteTweetsLinks] = useState(false);
    const isLoading = useSelector((store) => store.tweet.isLoading);

    const onChangeCount = (event) => {
        console.log("onChangeCount");
        const newCount = parseInt(event.target.value, 10);
        if (newCount <= 0 || newCount > 10) {
            setErrors({
                ...errors,
                count: "العدد الذي ادخلته غير صالح. الحد الأقصى هو 10",
            });
        } else {
            setErrors({ ...errors, count: "" });
            setCount(newCount);
            // Adjust the URLs array based on the new count
            setUrls((prevUrls) => {
                const newUrls = [...prevUrls];
                if (newCount > newUrls.length) {
                    return [...newUrls, ...Array(newCount - newUrls.length).fill("")];
                } else {
                    return newUrls.slice(0, newCount);
                }
            });
        }
    };

    const onChangeUrl = (index, event) => {
        const newUrls = [...urls];
        newUrls[index] = event.target.value;
        setUrls(newUrls);
    };

    const deleteTweetsByCount = () => {
        if (count <= 0) {
            console.log("count == 0 or null");
            return;
        } else {
            console.log("else");
            const accountsName = accounts
                .filter((account) => props.selectedAccounts.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);
            if (accountsName.length === 0) {
                aleartsToast("error", "يرجى اختيار الحسابات التي تود حذف تغريداتها");
            } else {
                // const urlsString = urls.join("\n");
                console.log(count)
                dispatch(
                    DeleteTweetsAction({
                        count: count,
                        accounts: accountsName,
                    })
                );
            }
        }
    };

    return (
        <>
        <div className="py-1">
            <div className="w-full">
                <div className="bg-white p-4">
                    <div className="grid gap-4 items-center">
                        <div className="flex items-center">
                            <ToggleCheckbox
                                name={"checkTweetsNum"}
                                onChange={() => {
                                    setCheckTweetsNum(!checkTweetsNum);
                                }}
                            />
                            <div className={"flex gap-1 items-center"}>
                                <div>حدد عدد التويت</div>
                                <div className={"flex flex-col gap-2"}>
                                    <TextInput
                                        name="tweetsNum"
                                        addClassDiv="w-1/"
                                        disabled={!checkTweetsNum}
                                        type="number"
                                        value={count}
                                        onChange={onChangeCount}
                                    />
                                    {errors.count && (
                                        <div className="text-red-500"> {errors.count} </div>
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="flex">
                            <ToggleCheckbox
                                checked={isOpenDeleteTweetsLinks}
                                onChange={() => {
                                    setIsOpenDeleteTweetsLinks(!isOpenDeleteTweetsLinks);
                                }}
                            />
                            <label> التويتات التي تود حذفها</label>
                        </div>
                    </div>

                    <div className={"flex gap-1 flex-row-reverse mt-10 "}>
                            <DefaultBtn
                                classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                title={isLoading ? <Spinner color={"#fff"}/> : "حفظ"}
                                onClick={deleteTweetsByCount}
                                type="submit"
                            />
                        <DefaultBtn
                            classBtn={"bg-primary-btn text-primary w-20 rounded-[6px]"}
                            title={"الغاء"}
                            onClick={props.handelClose}
                            type="button"
                        />
                    </div>
                </div>
            </div>
        </div>
            <DeleteTweetsLinks selectedAccounts={props.selectedAccounts} isModalOpen={isOpenDeleteTweetsLinks} onClose={() =>
                setIsOpenDeleteTweetsLinks(!isOpenDeleteTweetsLinks)}/>
        </>
    );
}

export default DeleteTweets;
