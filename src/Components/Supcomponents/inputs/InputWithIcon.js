import React from 'react';

function InputWithIcon(props) {
    return (
        <div className={" " + props.className}>
            <label className={"btn-primary px-4 text-[18px] bg-primary-btn w-full text-gray-500 flex justify-center items-end " +props.classNameLabel} htmlFor={props.id}>
                { props.iconClass ? <i className={props.iconClass}></i> : ""}
                { props.imgSrc ? <img alt={"img"} src={props.imgSrc} className={"w-[20px]"} /> : ""}
                <input className={"mr-2 custom-input"} name={props.name} type={'text'} value={props.vlaue}
                       onChange={props.onChange} placeholder={props.title}/>
            </label>

        </div>
    );
}

export default InputWithIcon;