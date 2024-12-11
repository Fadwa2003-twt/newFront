import React from 'react';
import {Tooltip} from 'react-tooltip'
import {AiOutlineUsergroupAdd} from "react-icons/ai";

function BtnsIcons(props) {
    return (<>
            <div className={"btns-table flex flex-row-reverse gap-3 px-20 text-sm " + props.className}>
                {props.departmentIcon ? <div data-tooltip-id="default-tooltip"
                                             data-tooltip-place="bottom"
                                             data-tooltip-content={props.tipDepartmentIcon}
                                             className={"users-icon cursor-pointer"}
                                             onClick={props.handelDepartmentIcon}>
                    <AiOutlineUsergroupAdd size={20} /></div> : ""}
                {props.userIcon ? <div data-tooltip-id="default-tooltip"
                                       data-tooltip-place="bottom"
                                       data-tooltip-content={props.tipUserIcon}
                                       className={"users-icon cursor-pointer"} onClick={props.handelUserIcon}>
                    <i className="fas fa-user-plus"></i></div> : ""}
                {props.deleteIcon ? <div data-tooltip-id="default-tooltip"
                                         data-tooltip-place="bottom"
                                         data-tooltip-content={props.tipDeleteIcon}
                                         className={"delete-icon cursor-pointer"} onClick={props.handelDeleteIcon}>
                    <i className="fa-regular fa-trash-can"></i></div> : ""}
                {props.editIcon ? <div data-tooltip-id="default-tooltip"
                                       data-tooltip-place="bottom"
                                       data-tooltip-content={props.tipEditIcon}
                                       className={"edit-icon cursor-pointer"} onClick={props.handelEditIcon}>
                    <i className="fa-regular fa-pen-to-square"></i></div> : ""}
            </div>

            <Tooltip id="default-tooltip"/>
        </>);
}

export default BtnsIcons;