import React, { useState } from 'react';

function MeetingCard(props) {

    return (
        <div
            key={props.id} // Assign key to each item in the list
            id={props.id}
            onClick={props.onClick}
            className={`meetingCard w-full py-4 px-3 flex justify-between rounded-md items-center cursor-pointer ${props.className}`}
        >
            <p className="default-font-size">{props.title}</p>
            <p className="default-font-size">{props.date}</p>
        </div>
    );
}

export default MeetingCard;
