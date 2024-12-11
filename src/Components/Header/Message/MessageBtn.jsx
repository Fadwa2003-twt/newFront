import React from 'react';
import message from "../../../assets/icons/message.png"

function MessageBtn({onClick}) {
    return (
        <button
            id="dropdownNotificationButton"
            onClick={onClick}
            className="relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
            type="button"
        >
            <img alt={"img"}
                 src={message}
                 className={"w-[20px] h-[20px]"}
            />
            <div
                className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full top-[7px] right-[-7px] start-2.5 dark:border-gray-900"></div>
        </button>
    );
}

export default MessageBtn;