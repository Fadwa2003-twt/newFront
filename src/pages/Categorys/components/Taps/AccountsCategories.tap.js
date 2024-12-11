import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import TreeComponent from "../../../../Components/Supcomponents/Tree.component";
import BtnsIcons from "../../../../Components/Supcomponents/Buttons/BtnsIcons";
import TableWithBtns from "../../../../Tables/TableWithBtns";
import PointColorComponent from "../../../../Components/PointColor.component";
import { Box } from '@mui/material';
import GetCategoriesAccountAction from "../../../../redux/action/CategoriesAccount/GetCategoriesAccount.action";
import GetInstaCategoriesAccountAction from "../../../../redux/action/CategoriesAccount/GetInstaCategoriesAccount.action";
import NewCategoryAccountModal from "../../../../modals/CategoriesAccounts/NewCategoryAccount.modal";
import SelectCheck from "../../../../methods/SelectCheck";
import {aleart, aleartsToast} from "../../../../alearts/alearts";
import DeleteSomeCategoriesAccountsAction
    from "../../../../redux/action/CategoriesAccount/DeleteSomeCategoriesAccounts.action";
import DeleteSomeCategoriesInstaAccountsAction
    from "../../../../redux/action/CategoriesAccount/DeleteSomeCategoriesInstAccounts.action";
import EditCategoryAccountModal from "../../../../modals/CategoriesAccounts/EditCategoryAccount.modal";

function AccountsCategoriesTap(props) {
    const categories = useSelector((state) => state.categoriesAccount.data);
    const categoriesInsta = useSelector((state) => state.categoriesInstaAccount.data);

    const [tableData, setTableData] = useState(categories || []); // Initialize with categories
    const dispatch = useDispatch();
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [type, setType] = useState("tweeter");
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [editCategory,setEditCategory] = useState({})
    const [counterCategories ,setCounterCategories] = useState(0)
    const [counterCategoriesInsta ,setCounterCategoriesInsta] = useState(0)
    const [counterCategoriesFacebook ,setCounterCategoriesFacebook] = useState(0)
    const [counterCategoriesYoutube ,setCounterCategoriesYoutube] = useState(0)
    const [counterCategoriesGmail ,setCounterCategoriesGmail] = useState(0)

    const findCategoryById = (id) => {
        const categoryInCategories = categories.find(category => category._id === id);
        if (categoryInCategories) return categoryInCategories;

        const categoryInInsta = categoriesInsta.find(category => category._id === id);
        return categoryInInsta || null;
    };


    const displayNewCategoryModal = () => {
        setIsNewCategoryModalOpen(!isNewCategoryModalOpen);
    };

    const displayEditCategoryModal = () => {
        setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
    };

    const handelOnClickTweeter = () => {
        setCategoriesIds([])
        setType("tweeter");
    };

    const handelOnClickInsta = () => {
        setCategoriesIds([])
        setType("insta");
    };

    const handelOnClickFacebook = () => {
        setCategoriesIds([])
        setType("facebook");
    };

    const handelOnClickYoutube = () => {
        setCategoriesIds([])
        setType("youtube");
    };

    const handelOnClickGmail = () => {
        setCategoriesIds([])
        setType("gmail");
    };

    const data = [
        { name: 'نويتر', _id: 1, onClick: handelOnClickTweeter ,counter:counterCategories},
        { name: 'انستجرام', _id: 2, onClick: handelOnClickInsta,counter:counterCategoriesInsta },
        { name: 'فيسبوك', _id: 3, onClick: handelOnClickFacebook,counter:counterCategoriesFacebook },
        { name: 'يوتيوب', _id: 4, onClick: handelOnClickYoutube,counter:counterCategoriesYoutube },
        { name: 'جيميل', _id: 5, onClick: handelOnClickGmail,counter:counterCategoriesGmail }
    ];

    const handelDeleteSomeCategories = () => {
        if(categoriesIds.length > 0) {
            if (type === "tweeter") {
                dispatch(DeleteSomeCategoriesAccountsAction({categoriesIds}))
                    .then(() => {
                        // بعد نجاح الحذف، نقوم بتحديث بيانات الجدول عن طريق حذف الفئات المحذوفة
                        const updatedTableData = tableData.filter(
                            (category) => !categoriesIds.includes(category._id)
                        );
                        setTableData(updatedTableData);
                        setCategoriesIds([]);
                    })
            } else if (type === "insta") {
                dispatch(DeleteSomeCategoriesInstaAccountsAction({categoriesIds}))
                    .then(() => {
                        // بعد نجاح الحذف، نقوم بتحديث بيانات الجدول عن طريق حذف الفئات المحذوفة
                        const updatedTableData = tableData.filter(
                            (category) => !categoriesIds.includes(category._id)
                        );
                        setTableData(updatedTableData);
                        setCategoriesIds([]);
                    })
            }
        }else{
            aleartsToast("error","يرجى اختيار الأصناف التي تريد حذفها")
        }
    }


    const handelEditCategory = () => {
        if (categoriesIds.length === 1) {
            const category = findCategoryById(categoriesIds[0]);
            if (category) {
                setEditCategory(category);
                displayEditCategoryModal();
            } else {
                aleartsToast("error", "لم يتم العثور على الفئة لتعديلها");
            }
        } else {
            aleartsToast("error", "يرجى اختيار صنف واحد لتعديله");
        }
    }
    const {
        selectAllChecked,
        toggleSelectAll,
        isItemSelected,
        toggleSelectItem,
    } = SelectCheck({
        allItems:tableData ,
        selectedItems: categoriesIds,
        setSelectedItems: setCategoriesIds,
    });


    useEffect(() => {
        dispatch(GetCategoriesAccountAction({ page: 1 }));
        dispatch(GetInstaCategoriesAccountAction({ page: 1 }));
    }, [dispatch]);

    useEffect(() => {
        setCounterCategoriesInsta(categoriesInsta.length)
        setCounterCategories(categories.length)
        switch (type){
            case "insta":
                setTableData(categoriesInsta)
                break
            case "tweeter":
                setTableData(categories)
                break
            case "facebook":
                setTableData([])
                break
            case "youtube":
                setTableData([])
                break
            case "gmail":
                setTableData([])
                break
            default:
                setTableData([])
                break
        }
    }, [type,categories,categoriesInsta]);



    return (
        <>
            <div className={"flex flex-col md:flex-row p-10 h-full gap-10 items-center md:items-stretch "}>
                {/* Tree Component */}
                <div className={"md:w-[23%] w-full h-full"}>
                    <div className={"w-full h-full md:border-l-2 border-gray-500 "}>
                        <TreeComponent
                            title={"التطبيقات"}
                            classNameContener={"w-[90%] gap-3 md:pt-5 md:pb-5"}
                            className={"gap-5"}
                            isFileIcon={true}
                            isCounter={true}
                            dataClick={data}
                            isBorder={false}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className={"flex flex-col w-full md:w-[72%]"}>
                    <div>
                        <BtnsIcons
                            plusIconId={"add-category"}
                            tipDepartmentIcon={"انشاء تصنيف جديد"}
                            departmentIcon={true}
                            tipDeleteIcon={"حذف التصنيفات المحددة"}
                            deleteId={"delete-categories"}
                            handelDepartmentIcon={displayNewCategoryModal}
                            tipEditIcon={"تعديل التصنيف المحدد"}
                            editIcon={true}
                            handelEditIcon={handelEditCategory}
                            deleteIcon={true}
                            handelDeleteIcon={handelDeleteSomeCategories}
                        />
                    </div>

                    <div>
                        <TableWithBtns
                            classNameHeader={"items-center"}
                            className={"gap-10 w-[90%]"}
                        >
                            <thead className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font">
                            <tr>
                                <th scope="col" className="py-3">
                                    <input type={"checkbox"} name={""} checked={selectAllChecked} onChange={toggleSelectAll} />
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    اسم التصنيف
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    تصنيف الاب
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData?.map((element, index) => (
                                <tr key={index}>
                                    <td className="py-3 w-[5%]">
                                        <input type={"checkbox"} value={element._id}
                                               checked={isItemSelected(element._id)}
                                               onChange={() => toggleSelectItem(element._id)}
                                        />
                                    </td>
                                    <td className="py-3 px-6">{element.name}</td>
                                    <td className="py-3 px-6">
                                        <div className={"flex flex-wrap max-w-[70%] gap-1"}>
                                            {
                                                element.parent ? (
                                                    <span
                                                        className="bg-primary text-white text-[13px] font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                                        {element.parent?.name}
                                                    </span>
                                                ) : ""
                                            }

                                        </div>
                                    </td>
                                    <td className={"py-3 w-[40%]"}>
                                        <Box sx={{display: 'flex', gap: 1 }}>
                                            {Array.from({ length: 11 }, (v, i) => i + 1).map((_, i) => (
                                                <PointColorComponent key={i} classNameCyrcle={"bg-[#49869666]"} />
                                            ))}
                                        </Box>
                                    </td>
                                    <td className={"py-3 font-bold"}>
                                        {element.accountCount}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </TableWithBtns>
                    </div>
                </div>
            </div>
            <NewCategoryAccountModal isModalOpen={isNewCategoryModalOpen}
                                     onClose={displayNewCategoryModal} type={type} />
            <EditCategoryAccountModal category={editCategory} setCategory={setEditCategory} isModalOpen={isEditCategoryModalOpen}
                                     onClose={displayEditCategoryModal} type={type} />
        </>
    );
}

export default AccountsCategoriesTap;
