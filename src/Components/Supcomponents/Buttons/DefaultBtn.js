import React from "react";

function DefaultBtn(props) {
    return (
        <div className={"flex " + props.className}>
            <button onClick={props.onClick} type={props.type} className={"btn-primary font-bold text-sm " + (props.classBtn ? props.classBtn : "bg-primary-btn text-primary w-40 rounded-[8px]") }>
                {props.title}
                {props.children}
            </button>
        </div>
    );
}

export default DefaultBtn;
