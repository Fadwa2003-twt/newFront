import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import DeleteTweetsAction from "../redux/action/Tweet/DeleteTweets.action";
import { aleartsToast } from "../alearts/alearts";
import CreateFollowAction from "../redux/action/Follow/CreateFollow.action";
import DeleteFollowAction from "../redux/action/Follow/DeleteFollow.action";
import CreateLikeAction from "../redux/action/Like/CreateLike.action";
import DeleteLikeAction from "../redux/action/Like/DeleteLike.action";
import CreateRetweetAction from "../redux/action/Retweet/CreateRetweet.action";
import DeleteRetweetAction from "../redux/action/Retweet/DeleteRetweet.action";
import CreateLikeInstaAction from "../redux/action/insta/CreateLikeInsta.action";
import DeleteLikeInstaAction from "../redux/action/insta/DeleteLikeInsta.action";
import DeletePostsAction from "../redux/action/insta/DeletePostsInsta.action";
import CreateInstaFollowAction from "../redux/action/insta/CreateInstaFollow.action";
import DeleteInstaFollowAction from "../redux/action/insta/DeleteInstaFollow.action";
import DeleteReelsAction from "../redux/action/insta/DeleteReels.action";
import DeleteStoriesAction from "../redux/action/insta/DeleteStories.action";
import DefaultBtn from "../Components/Supcomponents/Buttons/DefaultBtn";
import TableWithBtns from "./TableWithBtns";

function DataTableRows(props) {
    const dataAccounts = useSelector((state) => state.accounts.data);
    const [textFileBrows, setTextFileBrows] = useState();
    const fileInputRef = React.createRef();
    const [rows, setRows] = useState([]);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false)

    const openBrowsAndSelectFile = () => {
        // Trigger the hidden file input element
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setTextFileBrows(selectedFile);

        if (selectedFile) {
            setRows([]);
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const lines = content.split("\n");

                setRows((prevRows) =>
                    lines.map((line, index) => ({
                        id: index + 1,
                        rowInput: line,
                        checked: true,
                    }))
                );
            };

            reader.readAsText(selectedFile);
        }
    };

    const addRowForLinkTweet = () => {
        if (rows.length === 0) {
            setRows([{ id: 1, rowInput: "", checked: true }]);
        } else {
            setRows([
                ...rows,
                { id: rows[rows.length - 1].id + 1, rowInput: "", checked: true },
            ]);
        }
    };
    const clearLinks = () => {
        setRows([]);
    };
    const onChangeCheckInput = (event, id) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                switch (event.target.name) {
                    case "check":
                        return { ...row, checked: !row.checked };
                    case "rowInput":
                        return { ...row, rowInput: event.target.value };
                }
            }
            return row; // لا تغيير العناصر الأخرى
        });

        setRows(updatedRows); // تحديث المصفوفة بالعناصر المحدثة
    };

    const deleteTweets = () => {
        const tweetsWantDelete = rows.filter(
            (rows) => rows.checked && rows.rowInput
        );
        const renameLinkToUrl = tweetsWantDelete
            .map((tweetLink) => {
                return tweetLink.rowInput;
            })
            .join("\n");
        // Now you can do something with the "renameLinkToUrl" array
        if (tweetsWantDelete.length > 0) {
            dispatch(DeleteTweetsAction({ url: renameLinkToUrl, count: null }));
        } else {
            aleartsToast("error", "لا يوجد تغريدات لحذفها");
        }
    };

    const actionFunction = (type) => {
        const accontsCheck = rows.filter((rows) => rows.checked && rows.rowInput);
        const renameLinkToUrl = accontsCheck
            .map((tweetLink) => {
                return tweetLink.rowInput;
            })
            .join("\n");
        const accountsForAction = accontsCheck.map((account) => {
            return account.rowInput;
        });
        const accounts = dataAccounts.filter((account) => props.selectedAccounts?.includes(account._id)) // تعديل هنا لاستخدام account_id
            .map((account) => account.name);
        switch (type) {
            case "delete-tweet":
                setIsLoading(true)
                dispatch(
                    DeleteTweetsAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break
            case "delete-post-insta":
                dispatch(
                    DeletePostsAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "delete-reel-insta":
                dispatch(
                    DeleteReelsAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "delete-story-insta":
                dispatch(
                    DeleteStoriesAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "follow":
                dispatch(
                    CreateFollowAction({ accounts: accounts, follow: accountsForAction })
                );
                break;
            case "insta-follow":
                dispatch(
                    CreateInstaFollowAction({
                        accounts: accounts,
                        follow: accountsForAction,
                    })
                );
                break;
            case "insta-unfollow":
                dispatch(
                    DeleteInstaFollowAction({
                        accounts: accounts,
                        follow: accountsForAction,
                    })
                );
                break;
            case "unfollow":
                dispatch(
                    DeleteFollowAction({ accounts: accounts, follow: accountsForAction })
                );
                break;
            case "like":
                dispatch(
                    CreateLikeAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "delete-like":
                dispatch(
                    DeleteLikeAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "like-insta":
                dispatch(
                    CreateLikeInstaAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "delete-like-insta":
                dispatch(
                    DeleteLikeInstaAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "retweet":
                dispatch(
                    CreateRetweetAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
            case "delete-retweet":
                dispatch(
                    DeleteRetweetAction({ accounts: accounts, url: renameLinkToUrl })
                );
                break;
        }
    };

    const hanelSubmit = () => {
        switch (props.type) {
            case "deleteTweets":
                actionFunction("delete-tweet");
                break;
            case "delete-post-insta":
                actionFunction("delete-post-insta");
                break;
            case "delete-reel-insta":
                actionFunction("delete-reel-insta");
                break;
            case "delete-story-insta":
                actionFunction("delete-story-insta");
                break;
            case "follow":
                actionFunction("follow");
                break;
            case "insta-follow":
                actionFunction("insta-follow");
                break;
            case "insta-unfollow":
                actionFunction("insta-unfollow");
                break;
            case "unfollow":
                actionFunction("unfollow");
                break;
            case "like":
                actionFunction("like");
                break;
            case "delete-like":
                actionFunction("delete-like");
                break;
            case "like-insta":
                actionFunction("like-insta");
                break;
            case "delete-like-insta":
                actionFunction("delete-like-insta");
                break;
            case "retweet":
                actionFunction("retweet");
                break;
            case "delete-retweet":
                actionFunction("delete-retweet");
                break;
        }
    };

    return (
        <div>
            <div>
                <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <div>
                    <div className={"flex w-full gap-2 flex-wrap mb-5"}>
                        <DefaultBtn onClick={addRowForLinkTweet} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"اضافة"}/>
                        <DefaultBtn onClick={openBrowsAndSelectFile} className={"w-auto bg-primary-btn text-primary rounded-md"} classBtn={"w-auto"}
                                    title={"استيراد"}/>
                        <DefaultBtn onClick={hanelSubmit} className={"w-auto bg-primary-btn text-primary rounded-md"} classBtn={"w-auto"}
                                    title={props.thirdBtnTitle}/>
                        <DefaultBtn onClick={clearLinks} className={"w-auto bg-primary-btn text-primary rounded-md"} classBtn={"w-auto"}
                                    title={"مسح"}/>
                    </div>
                </div>
                <TableWithBtns pagination={false} classNameTable={"w-full"} >
                    <tbody>
                    {rows.map((element, index) => (
                        <tr>
                            <td className={"w-7"}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name={"check"}
                                    onChange={(event) => onChangeCheckInput(event, element.id)}
                                    checked={element.checked}
                                />
                            </td>
                            <td>
                                <input
                                    value={element.rowInput}
                                    name={"rowInput"}
                                    onChange={(event) => onChangeCheckInput(event, element.id)}
                                    type={"text"}
                                    className={
                                        "w-full form-control border-primary rounded-[6px] p-2 mb-2 border-opacity-25"
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </TableWithBtns>
            </div>
        </div>
    );
}

export default DataTableRows;
