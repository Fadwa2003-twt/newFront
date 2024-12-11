import React, {useEffect, useState} from 'react';
import {Box, Typography, IconButton, List, ListItem} from '@mui/material';
import SearchInput from "../../../../Components/Supcomponents/inputs/SearchInput";
import MeetingCard from "./MeetingCard";
import NewMeeting from "./NewMeeting";
import NewMeetingIcon from "../../../../assets/icons/meetings/meeting.png"

function MeetingsList(props) {
    const [activeCard, setActiveCard] = useState('');
    const [isNewMeetingModal, setIsNewMeetingModal] = useState(false);
    const meetingsList = [
        {title: 'اجتماع مراجعة المحتوى', date: "12/7/2024"},
        {title: 'اجتماع نشر المحتوى', date: "20/8/2024"},
        {title: 'اجتماع نشر المحتوى', date: "20/8/2024"},
        {title: 'اجتماع نشر المحتوى', date: "20/8/2024"}
    ];

    const handleClick = (e, title, date) => {
        const id = e.currentTarget.id;
        setActiveCard(id);
        props.changeData({"title": title, "date": date});
    };

    const handelNewMeetingModal = () => {
        setIsNewMeetingModal(!isNewMeetingModal)
    }

    useEffect(() => {
        setActiveCard("0");
        props.changeData(meetingsList[0]);
    }, []);

    return (
        <>
            <Box sx={{width: '100%', md: '32%', paddingLeft: 2, borderLeft: 2, borderColor: 'grey.200'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                    <Typography variant="h6">اجتماعات سابقة</Typography>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <IconButton onClick={handelNewMeetingModal}>
                            <img
                                src={NewMeetingIcon}
                                alt="img"
                                className={"w-[25px] h-[25px]"}
                            />
                        </IconButton>
                    </Box>
                </Box>
                <SearchInput/>
                <div className={"flex flex-col gap-2"}>
                    {meetingsList.map((element, index) => (
                        <div>
                            <MeetingCard
                                id={index.toString()}
                                title={element.title}
                                date={element.date}
                                onClick={(e) => handleClick(e, element.title, element.date)}
                                className={activeCard === index.toString() ? "bg-[#A6CDD74D]" : ""}
                            />
                        </div>
                    ))}
                </div>
            </Box>
            <NewMeeting isModalOpen={isNewMeetingModal} onClose={handelNewMeetingModal}/>
        </>
    );
}

export default MeetingsList;
