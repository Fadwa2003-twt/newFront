import React from "react";

function TextInput({ disabled = false, ...props }) {
    return (
        <div className={`input-group ${props.className ? props.className : ""} ${props.error ? "error" : ""}`}>
            <input
                className={`default-input-text py-2 px-4 input-font-size text-gray-500 w-full ${
                    props.classNameInput ? props.classNameInput : "rounded-[11px]"
                } ${props.error ? "input-error" : ""}`}
                name={props.name}
                type={props.type || "text"}
                value={props.value}
                onChange={props.onChange}
                disabled={disabled}
                placeholder={props.title}
            />

            {props.error && <p className="error-message">{props.error}</p>}
        </div>
    );
}

export default TextInput;
