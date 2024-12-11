import React from 'react';
import { Box, Typography } from "@mui/material";
import PointColorComponent from "../../PointColor.component";

function NotificationCardHeader(props) {
    return (
        <div className=" bg-[#49869633] cursor-pointer p-1 rounded-xl px-5">

            <div className={"flex justify-between max-h-[1rem]"} >
                <div className={"flex items-center gap-1"} >
                    <img alt={"img"} className={"w-[12px] h-[12px]"} src={props.imgSrcAlert} />
                    <div className={"text-[18px]"}>
                        {props.title}
                    </div>
                </div>
                <div className={"timeNotification flex gap-2 items-center text-gray-400 max-h-[1rem]"}>
                    <text className={'text-[13px]'}>8:00 ص</text>
                    <div className={"flex items-center gap-1"}>
                        <i className="fa-regular fa-clock text-[10px]"></i>
                        <text className={"text-[13px]"}>20/8/2024</text>
                    </div>
                </div>
            </div>
            <div >
                <PointColorComponent classNameDescription={"text-[18px] text-gray-500"} description={props.description} />
            </div>
        </div>
    );
}

export default NotificationCardHeader;