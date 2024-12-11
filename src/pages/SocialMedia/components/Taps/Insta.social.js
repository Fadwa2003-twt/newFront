import React, {useEffect, useState} from 'react';
import TreeComponent from "../../../../Components/Supcomponents/Tree.component";
import TableWithBtns from "../../../../Tables/TableWithBtns";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import AddAccountModal from "../../../../modals/Accounts/AddAccount.modal";
import AddTweetsModal from "../../../../modals/Accounts/AddTweets/AddTweets.modal";
import {useDispatch, useSelector} from "react-redux";
import GetAccountsEmployeeAction from "../../../../redux/action/Account/GetAccountsEmployee.action";
import GetCategoriesAccountAction from "../../../../redux/action/CategoriesAccount/GetCategoriesAccount.action";
import SelectCheck from "../../../../methods/SelectCheck";
import GetAccountsAction from "../../../../redux/action/Account/GetAccounts.action";
import DeleteSomeAccountsAction from "../../../../redux/action/Account/DeleteSomeAccounts.action";
import {aleartsToast} from "../../../../alearts/alearts";
import FollowModal from "../../../../modals/Accounts/Follow.modal";
import RetweetModal from "../../../../modals/Accounts/Retweet.modal";
import AddReply from "../../../../modals/Accounts/Reply/components/AddReply";
import ReplyModal from "../../../../modals/Accounts/Reply/Reply.modal";
import LikeModal from "../../../../modals/Accounts/Like.modal";
import GetDataInfoAccounts from "../../../../redux/action/Account/GetDataInfoAccounts.action";
import StoreCookiesAction from "../../../../redux/action/Account/StoreCookies.action";
import ToggleCheckbox from "../../../../Components/Supcomponents/inputs/ToggleCheckbox";
import Spinner from "../../../../Components/Supcomponents/Buttons/Spinner";
import UnLockModal from "../../../../modals/Accounts/UnLock.modal";
import ShowTweetModal from "../../../../modals/Accounts/ShowTweet.modal";
import GetInstaAccountsAction from "../../../../redux/action/Account/GetInstaAccounts.action";
import GetInstaCategoriesAccountAction
    from "../../../../redux/action/CategoriesAccount/GetInstaCategoriesAccount.action";
import DeleteInstaAccountsAction from "../../../../redux/action/Account/DeleteInstaAccounts.action";
import checkInstaAccounts from "../../../../redux/action/insta/StoreCookies.action";
import StoryModal from "../../../../modals/Accounts/insta/Story/StoryModal";
import ReelModal from "../../../../modals/Accounts/insta/Reel/ReelModal";

function InstaSocial(props) {

    const categoriesInsta = useSelector((state) => state.categoriesInstaAccount.data);
    const accountsInsta = useSelector((state) => state.accountsInsta.data);
    const accountsInstaObject = useSelector((state) => state.accountsInsta);
    const [selectedRows, setSelectRows] = useState([])
    const [tableData, setTableData] = useState(accountsInsta || []);
    const [accountsIds, setAccountsIds] = useState([]);
    const messagesAccounts = useSelector((store) => store.messages.messageState);
    const dispatch = useDispatch();
    const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const [isAddTweetModel, setIsAddTweetModel] = useState(false);
    const [isFollowModal, setIsFollowModal] = useState(false);
    const [isAddReelModel, setIsAddReelModel] = useState(false);
    const [isAddStoryModel, setIsAddStoryModel] = useState(false);
    const [isReTweetModal, setIsReTweetModal] = useState(false);
    const [isCommentModal, setIsCommentModal] = useState(false);
    const [isLikeModal, setIsLikeModal] = useState(false);
    const [clearCheck, setClearCheck] = useState(false);
    const isLoadingCheck = useSelector((store) => store.checkCookies.isLoading);
    const isLoadingDataInfo = useSelector((store) => store.dataInfo.isLoading);
    const isLoadingUnLock = useSelector((store) => store.unlock.isLoading);
    const [checkCookesAccounts, setCheckCookesAccounts] = useState([]);
    const [isUnlockModal, setIsUnlockModal] = React.useState(false);
    const [isShowTweetFormModal, setIsShowTweetFormModal] = useState();

    const displayAddAccountModal = () => {
        setIsAddAccountModalOpen(!isAddAccountModalOpen);
    }

    const {
        selectAllChecked,
        toggleSelectAll,
        isItemSelected,
        toggleSelectItem,
    } = SelectCheck({
        allItems: tableData,
        selectedItems: accountsIds,
        setSelectedItems: setAccountsIds,
    });


    useEffect(() => {
        dispatch(GetInstaAccountsAction({page: 1}));
        dispatch(GetInstaCategoriesAccountAction({ page: 1 }));
    }, [dispatch]);

    useEffect(() => {
        if (selectedRows && selectedRows.length > 0) {
            const accountsCategories = accountsInsta?.filter((account) => selectedRows.includes(account.Category?._id));
            setTableData(accountsCategories);
        } else {
            setTableData(accountsInsta); // في حال لم يتم اختيار أي صف، عرض كل الحسابات
            console.log(accountsInsta)
        }
    }, [selectedRows, accountsInsta]);

    const handelChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const handelClickDeleteBtn = () => {
        if (accountsIds.length > 0) {
            dispatch(DeleteInstaAccountsAction({accountsIds: accountsIds}));
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    useEffect(() => {
        dispatch(GetInstaCategoriesAccountAction({page: 1}));
        setCheckCookesAccounts(
            accountsInsta.filter((account) => account.AccountBasicInfo?.Cookie)
        );

    }, [accountsInsta, accountsInstaObject]);


    const handelAddTweet = () => {
        if (accountsIds.length > 0) {
            setIsAddTweetModel(!isAddTweetModel);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelAddReel = () => {
        if (accountsIds.length > 0) {
            setIsAddReelModel(!isAddReelModel);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelAddStory = () => {
        if (accountsIds.length > 0) {
            setIsAddStoryModel(!isAddStoryModel);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelFollow = () => {
        if (accountsIds.length > 0) {
            setIsFollowModal(!isFollowModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelRetweet = () => {
        if (accountsIds.length > 0) {
            setIsReTweetModal(!isReTweetModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelComment = () => {
        if (accountsIds.length > 0) {
            setIsCommentModal(!isCommentModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelLike = () => {
        if (accountsIds.length > 0) {
            setIsLikeModal(!isLikeModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const getDataInfo = () => {
        if (accountsIds.length > 0) {
            const accountsNames = accountsInsta
                .filter((account) => accountsIds.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => account.name);
            dispatch(GetDataInfoAccounts({accounts: accountsNames}));
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const storeCookies = () => {
        if (accountsIds.length > 0) {

            const accountInfo = accountsInsta
                .filter((account) => accountsIds.includes(account._id)) // تعديل هنا لاستخدام account_id
                .map((account) => {
                    return {name: account.name, cookies: account.AccountBasicInfo?.Cookie}
                });
            dispatch(
                checkInstaAccounts({accounts: accountInfo, clear: clearCheck})
            );
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handleChangeClearCheck = () => {
        setClearCheck(!clearCheck);
    };



    const handelUnlock = () => {
        if (accountsIds.length > 0) {
            setIsUnlockModal(!isUnlockModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };

    const handelshowTweetFormModal = () => {
        if (accountsIds.length > 0) {
            setIsShowTweetFormModal(!isShowTweetFormModal);
        } else {
            aleartsToast("error", "يرجى اختيار بعض الحسابات ");
        }
    };


    const getColumnValue = (account, columnName) => {
        switch (columnName) {
            case "name":
                return account.name;
            case "Category":
                let category = categoriesInsta.filter((category) =>
                    account.Category ? category._id === account.Category._id : ""
                );
                return category[0] ? category[0].name : "";
            case "Following":
                const accountFollowing = messagesAccounts?.filter((state) => {
                    return state.user === account.name;
                })[0];
                return accountFollowing?.response?.following == undefined
                    ? ""
                    : accountFollowing?.response?.following;
            case "Followers":
                const accountFollowers = messagesAccounts?.filter((state) => {
                    return state.user === account.name;
                })[0];
                return accountFollowers?.response?.followers == undefined
                    ? ""
                    : accountFollowers?.response?.followers;
            case "image":
                return (
                    <span class="avatar me-2 avatar-rounded">
            <img src={account.AccountDataInfo1.image} alt={"img"}/>
          </span>
                );
            case "Location":
                const accountLocation = messagesAccounts?.filter((state) => {
                    return state.user === account.name;
                })[0];
                return accountLocation?.location == undefined
                    ? ""
                    : accountLocation?.location == ""
                        ? "Twitter has not sent the location"
                        : accountLocation?.location;
            case "status":
                return account.AccountStatus;

            case "message":
                const accountStateMessage = messagesAccounts.filter(
                    (state) => state.user === account.name
                )[0];
                return accountStateMessage
                    ? accountStateMessage.message.replace(account.name, "")
                    : "";
            case "description":
                const accountDes = messagesAccounts?.filter((state) => {
                    return state.user === account.name;
                })[0];
                return accountDes?.description == undefined
                    ? ""
                    : accountDes?.description == ""
                        ? "Twitter has not sent the Description"
                        : accountDes?.description;

            case "cookies":
                return (
                    <div className={"cookiesPerant"}>
                        <div className={"cookies text-wrap"}>{account.AccountBasicInfo?.Cookie}</div>
                    </div>
                );
        }
    };


    useEffect(() => {
        const dataFilter = accountsInsta.filter((account) =>
            account.name?.toLowerCase().includes(searchValue.toLowerCase())
        );
        setTableData(dataFilter);
    }, [searchValue]);

    useEffect(() => {

        props.type === "admin" || props.type === "manager"
            ? dispatch(GetInstaAccountsAction({page: 1}))
            : dispatch(GetAccountsEmployeeAction({page: 1}));

        dispatch(GetInstaCategoriesAccountAction({page: 1}));
    }, [dispatch]);

    return (
        <>
            <div className={"max-w-full min-w-[300px] flex-grow flex flex-col md:flex-row gap-10 p-5 py-10"}>

                <TreeComponent data={categoriesInsta}
                               selectedRows={selectedRows}
                               onCheck={setSelectRows}
                               classNameContener={"md:w-[23%] w-full  gap-5 pr-5"} className={"w-[90%]"}
                               title={"الحسابات"}/>
                <div className={"max-w-[80%] w-[70%]"}>
                    <div className={"flex w-full gap-2 flex-wrap"}>
                        <DefaultBtn onClick={handelAddTweet} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"بوست"}/>
                        <DefaultBtn onClick={handelFollow} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"فولو"}/>
                        <DefaultBtn onClick={handelAddReel} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"ريل"}/>
                        <DefaultBtn onClick={handelLike} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"لايك"}/>
                        <DefaultBtn onClick={handelAddStory} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={"ستوري"}/>
                        <DefaultBtn onClick={getDataInfo} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={isLoadingDataInfo? <Spinner /> : "تحديث البيانات"}/>
                        <DefaultBtn onClick={storeCookies} className={"w-auto bg-primary-btn text-primary rounded-md"}
                                    classBtn={"w-auto"} title={isLoadingCheck ? <Spinner /> : "Check"}/>
                        <DefaultBtn onClick={handelUnlock} className={"w-auto bg-primary-btn text-primary rounded-md"}  classBtn={"w-auto"}
                                    title={isLoadingUnLock ? <Spinner /> :"الغاء قفل"}/>
                        <DefaultBtn onClick={handelshowTweetFormModal} className={"w-auto bg-primary-btn text-primary rounded-md"} classBtn={"w-auto"}
                                    title={"عرض"}/>
                        <DefaultBtn className={"w-auto bg-primary-btn text-primary rounded-md"} classBtn={"w-auto"}
                                    title={"فحص"}/>
                        <div className={"p-2 pl-0 border-primary rounded-[6px] flex items-center gap-2"}>
                            <text>مسح</text>
                            <ToggleCheckbox className={"w-auto "} checked={clearCheck} onChange={handleChangeClearCheck}
                                            classBtn={"w-auto"}/>
                        </div>
                    </div>
                    <TableWithBtns
                        departmentIcon={true}
                        className={"max-w-[70rem] relative overflow-x-auto tapsArea"}
                        handelDepartmentIcon={displayAddAccountModal}
                        deleteIcon={true}
                        deleteId={"deleteSomeAccounts"}
                        DeleteRed={false}
                        handelDeleteIcon={handelClickDeleteBtn}
                        plusIconId={"add-new-account"}
                        tipDepartmentIcon={"اضافة حسابات جديدة"}
                        tipDeleteIcon={"حذف الحسابات المحددة"}
                        isInput={true}
                        inputTitle={"بحث"}
                        inputName={"search"}
                        inputValue={searchValue}
                        onInputChange={handelChangeSearchInput}
                        classNameHeader={"items-center"}
                        inputClass={"my-5 w-1/3"}
                        classNameTable={"border-collapse border border-slate-400"}

                    >
                        <thead
                            className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font">
                        <tr>
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                <input type={"checkbox"} checked={selectAllChecked} onChange={toggleSelectAll}/>
                            </th>
                            <th scope="col px-6 py-4 " className="px-6 py-4 border border-slate-300">
                                الاسم
                            </th>
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                التصنيف
                            </th>
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                اسم الحساب
                            </th>
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                البيو
                            </th>
                            <th scope="col" className=" px-6 py-4 border border-slate-300">
                                الموقع
                            </th>
                            {/*<th scope="col" className="px-6 py-3">*/}
                            {/*    البيو*/}
                            {/*</th>*/}
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                عدد التويتات
                            </th>
                            <th scope="col " className="px-6 py-4 border border-slate-300">
                                عدد المتابعين
                            </th>
                            <th scope="col " className="px-6 py-4 border border-slate-300">
                                عدد المتابعون
                            </th>
                            <th scope="col " className="px-6 py-4 border border-slate-300">
                                الكوكيز
                            </th>
                            <th scope="col " className="px-6 py-4 border border-slate-300">
                                رسالة الحالة
                            </th>
                            <th scope="col" className="px-6 py-4 border border-slate-300">
                                الحالة
                            </th>
                        </tr>
                        </thead>
                        <tbody >
                        {
                            tableData?.map((element, index) => (
                                <tr key={element._id}>
                                    <td className="px-6 py-4 border border-slate-300">
                                        <input type={"checkbox"} value={element._id}
                                               checked={isItemSelected(element._id)}
                                               onChange={() => toggleSelectItem(element._id)}
                                        />
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 border border-slate-300 font-medium whitespace-normal overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {element.name}
                                    </th>
                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {element.Category?.name}
                                    </td>
                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {element.AccountDataInfo1?.FullName}
                                    </td>
                                    <td
                                        className="px-2 py-4 border border-slate-300 text-wrap text-ellipsis overflow-hidden min-w-[15rem]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {getColumnValue(element, "description") != ""
                                            ? getColumnValue(element, "description")
                                            : "No Data"}
                                    </td>
                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141", // Conditional color based on item.isDone
                                        }}
                                    >
                                        {getColumnValue(element, "Location") != ""
                                            ? getColumnValue(element, "Location")
                                            : "No Data"}
                                    </td>
                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {element.AccountDataInfo1?.Followers}
                                    </td>

                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {getColumnValue(element, "Followers") != ""
                                            ? getColumnValue(element, "Followers")
                                            : "No Data"}

                                    </td>
                                    <td
                                        className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {getColumnValue(element, "Following") != ""
                                            ? getColumnValue(element, "Following")
                                            : "No Data"}
                                    </td>
                                    <td
                                        className="px-2 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-full"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        <td>
                                            {element.AccountBasicInfo
                                                ? getColumnValue(element, "cookies")
                                                    ? getColumnValue(element, "cookies")
                                                    : "No Data"
                                                : ""}
                                        </td>
                                    </td>
                                    <td
                                        className="px-2 py-4 text-wrap min-w-[15rem] border border-slate-300 w-auto"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}
                                    >
                                        {getColumnValue(element, "message")}
                                    </td>
                                    <td className="px-6 py-4 border border-slate-300 text-ellipsis overflow-hidden max-w-[150px]"
                                        style={{
                                            fontFamily: "Katibeh",
                                            fontSize: "24px",
                                            fontWeight: 400,
                                            lineHeight: "33.6px",
                                            textAlign: "right",
                                            color: "#424141",
                                        }}>
                                        {element.AccountStatus
                                            ? getColumnValue(element, "status")
                                            : ""}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </TableWithBtns>
                </div>
            </div>

            <AddAccountModal isModalOpen={isAddAccountModalOpen} type={"insta"} onClose={displayAddAccountModal}/>
            <AddTweetsModal isModalOpen={isAddTweetModel} selectedAccounts={accountsIds} typeAccounts={"insta"} type={props.type}
                            onClose={handelAddTweet}/>
            <StoryModal isModalOpen={isAddStoryModel} selectedAccounts={accountsIds} type={props.type}
                            onClose={handelAddStory}/>
            <ReelModal isModalOpen={isAddReelModel} selectedAccounts={accountsIds} type={props.type}
                            onClose={handelAddReel}/>
            <FollowModal isModalOpen={isFollowModal} selectedAccounts={accountsIds} type={"insta"}  onClose={handelFollow}/>
            <RetweetModal isModalOpen={isReTweetModal} selectedAccounts={accountsIds}  onClose={handelRetweet}/>
            <LikeModal isModalOpen={isLikeModal} selectedAccounts={accountsIds} type={"insta"}  onClose={handelLike}/>
            <ReplyModal isModalOpen={isCommentModal} selectedAccounts={accountsIds} type={"insta"}  onClose={handelComment}/>
            <UnLockModal isModalOpen={isUnlockModal} selectedAccounts={accountsIds} type={"insta"}  onClose={handelUnlock}/>
            <ShowTweetModal isModalOpen={isShowTweetFormModal} selectedAccounts={accountsIds} type={"insta"}  onClose={handelshowTweetFormModal}/>
        </>
    );
}

export default InstaSocial;