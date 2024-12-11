import React, {useState} from 'react';

import TextInput from "../../../../../Components/Supcomponents/inputs/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { aleartsToast } from "../../../../../alearts/alearts";
import Spinner from "../../../../../Components/Supcomponents/Buttons/Spinner";
import DefaultBtn from "../../../../../Components/Supcomponents/Buttons/DefaultBtn";
import ToggleCheckbox from "../../../../../Components/Supcomponents/inputs/ToggleCheckbox";
import DeleteStoriesAction from "../../../../../redux/action/insta/DeleteStories.action";
import DeleteStoriesLinks from "./DeleteStoriesLinks";

function DeleteStories(props) {
    console.log(props);
    const [checkStoriesNum, setCheckStoriesNum] = useState(false);
    const [count, setCount] = useState(1); // Default count is 1
    const [errors, setErrors] = useState({ count: "" });
    const accounts = useSelector((state) => state.accounts.data);
    const [urls, setUrls] = useState([""]); // Initialize with one empty URL
    const dispatch = useDispatch();
    const [isOpenDeleteStoriesLinks, setIsOpenDeleteStoriesLinks] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

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

    const deleteStoriesByCount = () => {
        if (count <= 0) {
            console.log("count == 0 or null");
            return;
        } else {
            console.log("else");
            const accountsName = accounts
                .filter((account) => props.selectedAccounts.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);
            if (accountsName.length === 0) {
                aleartsToast("error", "يرجى اختيار الحسابات التي تود حذف الستوري لها");
            } else {
                setIsLoading(true)
                // const urlsString = urls.join("\n");
                console.log(count)
                dispatch(
                    DeleteStoriesAction({
                        url:null,
                        count: count,
                        accounts: accountsName,
                    })
                ).then(() => {
                    setIsLoading(false)
                    props.handelClose();
                }).catch(() =>{
                    setIsLoading(false)
                });;
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
                                    name={"checkStoriesNum"}
                                    onChange={() => {
                                        setCheckStoriesNum(!checkStoriesNum);
                                    }}
                                />
                                <div className={"flex gap-1 items-center"}>
                                    <div>حدد عدد الستوري</div>
                                    <div className={"flex flex-col gap-2"}>
                                        <TextInput
                                            name="StoriesNum"
                                            addClassDiv="w-1/"
                                            disabled={!checkStoriesNum}
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
                                    checked={isOpenDeleteStoriesLinks}
                                    onChange={() => {
                                        setIsOpenDeleteStoriesLinks(!isOpenDeleteStoriesLinks);
                                    }}
                                />
                                <label> الستوري التي تود حذفها</label>
                            </div>
                        </div>

                        <div className={"flex gap-1 flex-row-reverse mt-10 "}>
                            <DefaultBtn
                                classBtn={"bg-primary text-white w-20 rounded-[6px]"}
                                title={isLoading ? <Spinner color={"#fff"}/> : "حفظ"}
                                onClick={deleteStoriesByCount}
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
            <DeleteStoriesLinks selectedAccounts={props.selectedAccounts} isModalOpen={isOpenDeleteStoriesLinks} onClose={() =>
                setIsOpenDeleteStoriesLinks(!isOpenDeleteStoriesLinks)}/>
        </>
    );
}

export default DeleteStories;