import React, {useEffect, useState} from 'react';
import TableWithBtns from "../../../../Tables/TableWithBtns";
import PointColorComponent from "../../../../Components/PointColor.component";
import {Box} from '@mui/material';
import editIcon from "../../../../assets/icons/actions/edit.png";
import CreateContentCategoryModal from "../../../../modals/ContentCategory/CreateContentCategory.modal";
import EditContentCategoryModal from "../../../../modals/ContentCategory/EditContentCategory.modal"; // Import the modal
import {useDispatch, useSelector} from "react-redux";
import GetCategoriesAction from "../../../../redux/action/Category/GetCategories.action";
import ShowTextFileModal from "../../../../modals/ContentCategory/ShowTextFile.modal";
import SelectCheck from "../../../../methods/SelectCheck";
import DeleteSomeCategoriesAction from "../../../../redux/action/Category/DeleteSomeCategories.action";
import DeleteFileCategoryAction from "../../../../redux/action/Category/DeleteFileCategory.action";
import {aleartsToast} from "../../../../alearts/alearts";

function ContentsCategoriesTap(props) {
    const [isCreateCategoryModal, setIsCreateCategoryModal] = useState(false);
    const [isEditCategoryModal, setIsEditCategoryModal] = useState(false); // State for Edit Modal
    const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
    const [openAccordion, setOpenAccordion] = useState(null); // state to manage open accordion
    const categories = useSelector((state) => state.categories.data);
    const dispatch = useDispatch();
    const [categoriesIds, setCategoriesIds] = useState([]);
    const [isShowFileModl, setIsShowFileModl] = useState(false)
    const [readTextFile, setReadTextFile] = useState("")

    const handleCreateModal = () => {
        setIsCreateCategoryModal(!isCreateCategoryModal);
    };

    const handleEditModal = (category) => {
        setSelectedCategory(category); // Set selected category
        setIsEditCategoryModal(true); // Open Edit Modal
    };

    const handleShowFileModl = () => {
        setIsShowFileModl(!isShowFileModl);
    };

    const toggleAccordion = (id) => {
        setOpenAccordion(openAccordion === id ? null : id); // Toggle accordion open/close
    };

    const {
        selectAllChecked,
        toggleSelectAll,
        isItemSelected,
        toggleSelectItem,
    } = SelectCheck({
        allItems: categories,
        selectedItems: categoriesIds,
        setSelectedItems: setCategoriesIds,
    });

    const handelDeleteSomeCategories = () => {
        if (categoriesIds.length > 0) {
            dispatch(DeleteSomeCategoriesAction({categoriesIds}))
        } else {
            aleartsToast("error", "يرجى اختيار الأصناف التي تريد حذفها")
        }
    }

    useEffect(() => {
        dispatch(GetCategoriesAction({page: 1}));
    }, [dispatch]);

    return (
        <>
            <Box px={10} py={7}>
                <TableWithBtns
                    title={"فئات المحتوى"}
                    classNameIcons={"p-0"}
                    classNameHeader={"items-center"}
                    className={"gap-5 w-full"}
                    tipDepartmentIcon={"اضافة تصنيف محتوى"}
                    tipDeleteIcon={"حذف التصنيفات المحددة"}
                    deleteIcon={true}
                    handelDeleteIcon={handelDeleteSomeCategories}
                    departmentIcon={true}
                    handelDepartmentIcon={handleCreateModal}
                >
                    <thead
                        className="table-font text-primary text-gray-900 uppercase dark:text-gray-400 title-table-font">
                    <tr>
                        <th scope="col" className="py-3 min-w-10">
                            <input type={"checkbox"} name={""} checked={selectAllChecked} onChange={toggleSelectAll}/>
                        </th>
                        <th scope="col" className="py-3 min-w-32">
                            اسم الفئة
                        </th>
                        <th scope="col" className="py-3 min-w-32">
                            المشرف
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        categories ?
                            categories.map((category) => (
                                <React.Fragment key={category._id}>
                                    <tr className={" hover:bg-gray-200"}>
                                        <td className="py-3 min-w-10">
                                            <input type={"checkbox"} value={category._id}
                                                   checked={isItemSelected(category._id)}
                                                   onChange={() => toggleSelectItem(category._id)}
                                            />
                                        </td>
                                        <td onClick={() => toggleAccordion(category._id)}
                                            className="py-3 min-w-20 cursor-pointer">
                                            {category.name}
                                        </td>
                                        <td className="py-3 min-w-20">{category.supervisor?.name}</td>
                                        <td className={"py-3 w-[40%]"}>
                                            <Box display="flex" gap={1}>
                                                {Array.from({length: 18}, (v, i) => i + 1).map(() => (
                                                    <PointColorComponent classNameCyrcle={"bg-[#49869666]"}/>
                                                ))}
                                            </Box>
                                        </td>
                                        <td id={"editBtn"} className={"py-3 font-bold"}>
                                            <img
                                                alt={"img"}
                                                className={"w-[18px] cursor-pointer"}
                                                src={editIcon}
                                                onClick={() => handleEditModal(category)} // Show modal on click
                                            />
                                        </td>
                                    </tr>
                                    {openAccordion === category._id && category.files?.length > 0 && (
                                        category.files.map((file) => (
                                            <tr key={file._id}>
                                                <td colSpan={5} className="py-3 bg-gray-100">
                                                    <div className="pr-3 pl-7 flex justify-between">
                                                        <div className={"flex gap-2 items-baseline cursor-pointer"}
                                                             onClick={() => {
                                                                 setReadTextFile(file)
                                                                 handleShowFileModl()
                                                             }}>
                                                            <i className={"fa fa-file text-sm"}></i>
                                                            {
                                                                file.replace(/^.*[\\\/]/, '')
                                                            }
                                                        </div>
                                                        <div onClick={() => dispatch(DeleteFileCategoryAction({categoryId:category._id,file:file}))}>
                                                            <i className="fa-regular fa-trash-can text-red-500 text-sm cursor-pointer"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </React.Fragment>
                            ))
                            : <tr>
                                <td colSpan={5}>لا يوجد تصانيف محتوى حاليا</td>
                            </tr>
                    }
                    </tbody>
                </TableWithBtns>
            </Box>
            <ShowTextFileModal isModalOpen={isShowFileModl} onClose={handleShowFileModl} file={readTextFile}/>
            <CreateContentCategoryModal isModalOpen={isCreateCategoryModal} onClose={handleCreateModal}/>
            <EditContentCategoryModal isModalOpen={isEditCategoryModal} onClose={() => setIsEditCategoryModal(false)} category={selectedCategory}/> {/* Pass category to modal */}
        </>
    );
}

export default ContentsCategoriesTap;
