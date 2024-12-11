import React, {useEffect, useState} from "react";
import { Box, Grid, Divider } from "@mui/material";
import ChatWindow from "../components/Chats/ChatWindow";
import ChatList from "../components/Chats/ChatList";
import TapsComponent from "../../../Components/Taps.component";
import {useDispatch, useSelector} from "react-redux";
import GetConversationAction from "../../../redux/action/Conversation/GetConversation.action";
import GetConversationsAction from "../../../redux/action/Conversation/GetConversation.action";

const FirstTapComponent = () => {

  const [selectedChat, setSelectedChat] = useState({});
    const dispatch = useDispatch();
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
      localStorage.setItem('chat', chat._id);
      dispatch(GetConversationAction(chat));
  };
    useEffect(()=> {
        const start = async() => {
            try{
                //dispatch getConversations
                dispatch(GetConversationsAction());
            }catch(e){
                console.log(e)
            }
        }
        start()
    } , [])
  return (
    <div className={"w-full px-10 pt-10 box-border"}>
      <div className={"flex flex-col justify-between sm:flex-row"} container>
        <div className={"w-[30%] border-l-2 border-[#79797c] pl-10 "}>
          <ChatList selectedChat={selectedChat} onChatClick={handleChatClick} />
        </div>
        <div className={"w-[66%]"} >
          <div className={"flex h-full"}>
            <div className={"flex-grow"}>
              <ChatWindow selectedChat={selectedChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTapComponent;
