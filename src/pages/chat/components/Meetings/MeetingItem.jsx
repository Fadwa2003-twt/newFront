import React from 'react';

function MeetingItem(props) {
    return (
        <div onClick={props.onClick} className={"flex h-[40px] w-4/12 py-6 px-4 border-2 rounded-lg border-[#49869680] items-center gap-3 cursor-pointer"}>
            <img alt={"img"}
                 className={"w-[40px] h-[40px]"}
                 src={props.srcImg}/>
            <p className={"text-[#498696]"}>{props.title}</p>
        </div>
    );
}

export default MeetingItem;