import React from 'react';
import PointColorComponent from "../../PointColor.component";

function MessageCardHeader(props) {
    return (
        <div className="flex gap-1 bg-[#49869633] cursor-pointer p-1 rounded-xl px-5">
            <div className={"flex items-center"}>
                <img
                    alt={"img"}
                    src={props.image}
                    className={"rounded-full w-[45px] h-[45px] border-2 border-white"}
                />
            </div>
            <div className={""}>
                <div className={"flex justify-between"}>
                    <div className={"text-lg"}>
                        {props.name}
                    </div>
                    <div className={"timeNotification  flex gap-2 text-gray-400 text-sm"}>
                        <text className={"text-[13px]"}>8:00 ص</text>
                        <div className={"flex items-baseline gap-1"}>
                            <i className="fa-regular fa-clock text-[10px]"></i>
                            <text className={"text-[13px]"}>20/8/2024</text>
                        </div>
                    </div>
                </div>
                <div className={"text-sm"}>
                    {props.description}
                </div>
            </div>
        </div>
    );
}

export default MessageCardHeader;