import React, {useState} from "react";
import PagenationComponent from "./ComponentsTable/PagenationComponent";
import BtnsIcons from "../Components/Supcomponents/Buttons/BtnsIcons";
import SearchIcon from "@mui/icons-material/Search";
import {Box, IconButton, TextField} from "@mui/material";

function TableWithBtns({
                           children,
                           className,
                           title,
                           titleClass,
                           isInput,
                           inputValue,
                           onInputChange,
                           userIcon,
                           handelUserIcon,
                           departmentIcon,
                           handelDepartmentIcon,
                           editIcon,
                           handelEditIcon,
                           deleteIcon,
                           handelDeleteIcon,
                           pagination=true,
                           totalItems,
                           itemsPerPage,
                           currentPage = 0,
                           onPageChange,
                           classNameIcons,
                           plusIconId,
                           plusIconContent,
                           deleteContent,
                           deleteId,
                           DeleteRed,
                           classNameHeader,
                           classNameTable,
                           tipEditIcon,
                           tipDeleteIcon,
                           tipUserIcon,
                           tipDepartmentIcon
                       }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    return (
        <div className={"flex flex-col " + className}>
            <div className={"flex flex-row-reverse justify-between px-6 " + classNameHeader}>
                <div>
                    <BtnsIcons
                        className={classNameIcons}
                        userIcon={userIcon}
                        handelUserIcon={handelUserIcon}

                        plusIconId={plusIconId}
                        plusIconContent={plusIconContent}
                        departmentIcon={departmentIcon}
                        deleteContent={deleteContent}
                        deleteId={deleteId}
                        handelDepartmentIcon={handelDepartmentIcon}
                        editIcon={editIcon}
                        handelEditIcon={handelEditIcon}
                        DeleteRed={DeleteRed}
                        deleteIcon={deleteIcon}
                        handelDeleteIcon={handelDeleteIcon}
                        tipDepartmentIcon={tipDepartmentIcon}
                        tipUserIcon={tipUserIcon}
                        tipDeleteIcon={tipDeleteIcon}
                        tipEditIcon={tipEditIcon}
                    />
                </div>
                <div className={"flex flex-col"}>
                    {title ? (
                        <div className={" " + titleClass ? titleClass : "pb-5"}>
                            <h3 className={"font-bold"}>{title}</h3>
                        </div>
                    ) : (
                        ""
                    )}
                    {isInput ? (
                        <div>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 5,
                                    mt: 5,
                                    height: 35,
                                    width: 300,
                                    borderRadius: 2,
                                    backgroundColor: "#A6CDD7",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <IconButton sx={{p: 0, ml: 1}}>
                                    <SearchIcon sx={{color: "#fff", fontSize: "1.5rem"}}/>
                                </IconButton>
                                <Box
                                    sx={{
                                        height: "80%",
                                        width: "1px",
                                        backgroundColor: "#fff",
                                    }}
                                />
                                <TextField
                                    placeholder="البحث"
                                    variant="outlined"
                                    value={inputValue}
                                    onChange={onInputChange}
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            border: "none",
                                            outline: "none",
                                            padding: 0,
                                            color: "#fff",
                                        },
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: "none",
                                            },
                                            paddingLeft: 1,
                                            paddingRight: 1,
                                        },
                                        "& .MuiInputBase-input": {
                                            height: 35,
                                            fontSize: "1rem",
                                            fontWeight: 700, // Make the text bold
                                        },
                                    }}
                                />
                            </Box>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="relative overflow-x-auto tapsArea">
                <table className={"max-w-full  text-sm text-right ltr:text-left text-gray-500 dark:text-gray-400 " + classNameTable}>
                    {children}
                </table>
            </div>
            {
                pagination ?
                    <PagenationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handelNext={handleNext}
                        onPageChange={onPageChange}
                        handelPrevious={handlePrevious}
                    />
                    :""
            }

        </div>
    );
}

export default TableWithBtns;
