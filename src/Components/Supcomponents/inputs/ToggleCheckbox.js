import React from "react";

function ToggleCheckbox(props) {
    return (
        <label className={`inline-flex items-center cursor-pointer ${props.addClass}`}>
            <input
                type="checkbox"
                name={props.name}
                onChange={props.onChange}
                className="sr-only peer hidden"
                checked={props.checked}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:bg-teal-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:end-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {props.title}
            </span>
        </label>
    );
}

export default ToggleCheckbox;
