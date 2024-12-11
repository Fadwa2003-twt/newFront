import React, {useEffect, useState} from "react";
import { Box, IconButton, Paper, Typography, Avatar } from "@mui/material";
import { ArrowBack, Call, VideoCall } from "@mui/icons-material";
import MessageInput from "./MessageInput";
import Message from "./Message";
import {useDispatch, useSelector} from "react-redux";
import CreateMessageAction from "../../../../redux/action/Conversation/CreateMessage.action";
import GetConversationAction from "../../../../redux/action/Conversation/GetConversation.action";
import videoCallIcon from "../../../../assets/icons/chats/video-call.png"
import phoneIcon from "../../../../assets/icons/chats/phone.png"
import backIcon from "../../../../assets/icons/chats/back.png"

const ChatWindow = ({ selectedChat }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const chat = useSelector(state => state.conversations.chat)
    const user = useSelector(state => state.user.data);
    const handleSubmitValues = async (e) => {
        e.preventDefault();
        const values = {
            message: message,
            chat: chat,
            files: selectedFiles
        };
        console.log(values)
        dispatch(CreateMessageAction(values));
        setMessage('');
        setSelectedFiles([]);

        const values_2 = { _id: chat.chat_id };
        if (selectedFiles.length > 0) {
            setTimeout(async () => {
                await dispatch(GetConversationAction(values_2));
            }, 2000);
        }
    };
    useEffect(() => {
        console.log(selectedChat)
    }, [selectedChat]);
  return (
    <Paper
      elevation={3}
      padding={0}
      sx={{
        width: "100%",
        maxWidth: "760px",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        border: "1px solid #498696",
        boxShadow: "none",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2, // Padding for the header
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Avatar alt={selectedChat.name} src={selectedChat.avatar} />
          <Typography variant="h6" sx={{ mr: 2 }}>
            {selectedChat.name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1, // Space between icons
          }}
        >
          <IconButton sx={{ p: 0 }}>
            <img
              src={videoCallIcon}
              alt="icon1"
              style={{ width: 25, height: 25 }} // Set image size
            />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <img
              src={phoneIcon}
              alt="icon2"
              style={{ width: 25, height: 25 }} // Set image size
            />
          </IconButton>
          <IconButton sx={{ p: 0 }}>
            <img
              src={backIcon}
              alt="icon3"
              style={{ width: 25, height: 25 }} // Set image size
            />
          </IconButton>
        </Box>
      </Box>
        {
            Object.keys(selectedChat).length !== 0 ?  <Box sx={{flex: 1, overflowY: "auto", px: 2}}>
                {
                    Object.keys(chat?.messages).length ?
                        chat.messages.map((message, index) => (
                            <>
                                <Message text={message.message} isUser={message.sender_id !== user._id}/>
                            </>
                        )) : <div className={"flex justify-center items-center w-full h-full"}>
                            <div className={"h-full flex items-center justify-center"}>
                                <h6>لا يوجد رسائل بعد لعرضها في هذه المحادثة</h6>
                            </div>
                        </div>
                }
            </Box>: <div className={"flex justify-center items-center w-full h-full"}>
                <div className={"h-full flex items-center justify-center"}>
                    <h6>يرجى الضغط على إحدى المحادثات لعرضها</h6>
                </div>
            </div>
        }

      <Box sx={{ p: 2 }}>
        <MessageInput message={message} onChangeInput={(e) => setMessage(e.target.value)} onClickSend={handleSubmitValues}/>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
