import React, {useState} from 'react';
import {Box, Typography, Avatar} from '@mui/material';
import MeetingItem from './MeetingItem';
import MainPoints from "./MainPoints";
import MessagesOFMeeting from "./MessagesOFMeeting";
import AdditionsFilesOfMeeting from "./AdditionsFilesOFMeeting";
import "./MenuMeeting.css"
import FilesIcon from "../../../../assets/icons/meetings/files.png"
import MainPointIcon from "../../../../assets/icons/meetings/main-point.png"
import MeetingChats from "../../../../assets/icons/meetings/meeting-chats.png"

function MeetingMenu(props) {
    const [isMainPointModal,setIsMainPointModal] = useState(false)
    const [isMessagesOFMeetingModal,setIsMessagesOFMeetingModal] = useState(false)
    const [isFilesOFMeetingModal,setIsFilesOFMeetingModal] = useState(false)
    const handelMainPointModal = () => {
       setIsMainPointModal(!isMainPointModal)
    }
    const handelMessagesOFMeetingModal = () => {
        console.log("chat")
        setIsMessagesOFMeetingModal(!isMessagesOFMeetingModal)
    }
    const handelFilesOFMeetingModal = () => {
        setIsFilesOFMeetingModal(!isFilesOFMeetingModal)
    }
    return (
        <>
            <Box sx={{width: {md: '100%', sm: '100%'}, display: 'flex', flexDirection: 'column', gap: 3}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {props.data.title}
                        </Typography>
                        <Typography variant="body2">{props.data.date}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', gap: 1}}>
                        <Avatar
                            alt="img"
                            src="https://s3-alpha-sig.figma.com/img/13d6/b0c9/82c7d2fc62c1c24febf90f8c169e4a2a?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AbXfxw89NySV4lIIve6imI6Blqf6Pr2q5r36ljl-alulxCrzllCp3eJ~BkKEbbpJoV-rD3OfbhKo81Nhx4S3dAUior6H-MaYNSTkPDZOp1vHmoHvoAsm3eZ991Q0l3i1cBe3PLFuZ5y4K9~3Ed4d-8VZh6mhlRcOrjEVdi97hZ8x1F-hAvPThPWERlxhrvCmspN74LXAheMcDtIH4bBfpFqDHJ9W~02iONnbSvu-dI6z-6rjE8IUxM-5HtkCmledjjxgSZO4-hloAHVYwgxNgp1agdGrYDqM9of4kKGVRnJDCrweNNxzMvhl1rx4QOYSoLvmdm34tzj5h95~g8P~hA__"
                            sx={{width: 30, height: 30}}
                        />
                        <Avatar
                            alt="img"
                            src="https://s3-alpha-sig.figma.com/img/fd21/0de3/f17371c9f1b833eba9f9041b0160be3b?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nrnNFruB4zgulODUkqwJulZQ5TIjFHGLWdcEwfxN5WCQcBSORrj2EK6X67ajv5myjD0v5AWf9ym7KpZjOlkXIqnsX6yYf-A-108A16tV7VZL6mxGlw7UlC2459BoFZxd~e9sI4tJinoPSaAWPYGsFQbH~OQ-SWxfzVVpRWCnIyoroIS68AIiU3bcCFr8MZQxM98uEaMxOpCE88O5XQRYLEnRlSjWEIPHq4-H6aG4ZM066QCWbTZgrPYElKdkMAOrRalLUsAevNo6JIe6Nvsf6Gzz3gXvYt6n-SgoKwie3OwsbaqaIEX3FAgm1Iju-dMxmPWokHBDX-Q8AqI-yB1pxA__"
                            sx={{width: 30, height: 30}}
                        />
                        <Avatar
                            alt="img"
                            src="https://s3-alpha-sig.figma.com/img/c12d/e910/1a81a693c82c970b0be2345d98c90c67?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TS~XBz5NFh12FCdPwefY4o8GLOggXY5UL6RVufL6N5V9PHC9yDxnV~Rw3jsi0dzjovuemlRJ--fLducLJ5XlmrRYolWJGy3YGvwLEg~iJhfattf3he5rzZukOtTXuFcKgBJ4HWCvJGfUoQgvqNkt8GjChSdn07kefAMD9N3MtIlye9vbH5KCUnoJoLPWClmHBI33TE0cchFXz6FPuGi6wx4DG8y3bUZuzJRAmk7CVr3wfshe~A2AngcCjzpo070XWS8RvJMGTrIjsZV8d~-7sc-jREFrQ8qTwarrMXrhfjNPSqDoQJtm~rDoaLCdG5A0SaesEgarmxkPHmVLBwS2HQ__"
                            sx={{width: 30, height: 30}}
                        />
                        <Avatar
                            alt="img"
                            src="https://s3-alpha-sig.figma.com/img/532c/ba33/94a5cc08c967c81562f1b2a8369293f7?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=beqgV6Q9EaMlSK6M~9DRa7VjVXVf35Y-WVQP5~OO6Rq7-iLNDYncayQ8AemHtbqtzfnXc-wIc86iJ6ljZ~8MklZQ621wh5Rf6~y7Z9T8rM1izo3diZA8D5UDUFAtRImeXYsQ3Bv9wefdxSL-KFOHeXln82BukTsl0LaBFAAetCd0ZDeZ4dPs3ucquF6FJIbb-4URyG3xH1me-RtzrMuDjoiFrJFOoYrOqqg6b2EH4Nt6r9cFplIAB2ctYLifeI-dad~ZgHKuazxvbkO~rzGsLiql9H5Yo4b5I8mJveq7oOwshnYxMgeSOLUFbNTzgUQwVdNevJT25UwXFb8fEuXzGg__"
                            sx={{width: 30, height: 30}}
                        />
                    </Box>
                </Box>
                <Box sx={{display: 'flex', padding: '70px 70px', justifyContent: "center", alignItems: "center"}}>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 4}}>
                        <MeetingItem
                            title="النقاط الرئيسية"
                            onClick={handelMainPointModal}
                            srcImg={MainPointIcon}
                        />

                        <MeetingItem title={"الملفات"}
                                     onClick={handelFilesOFMeetingModal}
                                     srcImg={FilesIcon}
                        />
                        <MeetingItem title={"المحادثات"}
                                     onClick={handelMessagesOFMeetingModal}
                                     srcImg={MeetingChats}
                        />

                    </Box>
                </Box>
            </Box>

            <MainPoints isModalOpen={isMainPointModal} onClose={handelMainPointModal} />
            <MessagesOFMeeting isModalOpen={isMessagesOFMeetingModal} onClose={handelMessagesOFMeetingModal} />
            <AdditionsFilesOfMeeting isModalOpen={isFilesOFMeetingModal} onClose={handelFilesOFMeetingModal} />
        </>
    );
}

export default MeetingMenu;
