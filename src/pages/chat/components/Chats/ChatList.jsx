import React, {useEffect} from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material";
import "../../styles/ChatList.css";
import CreateChatModal from "./CreateChatModal";
import {useDispatch, useSelector} from "react-redux";
import GetConversationAction from "../../../../redux/action/Conversation/GetConversation.action";
import GetConversationsAction from "../../../../redux/action/Conversation/GetConversations.action";
import createChatIcon from "../../../../assets/icons/chats/create-chat.png"
import searchIcon from "../../../../assets/icons/search.png"

const ChatList = ({ selectedChat, onChatClick }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
    const chats = useSelector(state => state.conversations.chats);
    const dispatch = useDispatch();
  const accounts = [
    { name: "محمد علي", avatar: "url_to_avatar1.jpg" },
    { name: "حسام عكيله", avatar: "url_to_avatar2.jpg" },
    { name: "رنا الحايك", avatar: "url_to_avatar3.jpg" },
    { name: "محمد عمر", avatar: "url_to_avatar4.jpg" },
  ];
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


    useEffect(() => {
        dispatch(GetConversationsAction())
        console.log(chats)
    },[])

  return (
    <div className="flex flex-col" >
      <div className="flex items-center rtl flex-row-reverse justify-between mb-2">
        <IconButton onClick={handleModalOpen}>
          <img
            src={createChatIcon}
            alt="icon"
          />
        </IconButton>
        <text className={"font-family-primary text-[20px]"}>محادثات الموظفين</text>
      </div>
      <div className={"flex items-center rtl border border-[#ccc] rounded-lg h-8"}>
        <IconButton sx={{ p: 0, mr: 1 }}>
          <img
            src={searchIcon}
            alt="Search icon"
            style={{ width: 25, height: 25 }}
          />
        </IconButton>
        <Box
          sx={{
            height: 20,
            width: "1%",
            backgroundColor: "#ccc",
            mx: 1,
          }}
        />
        <TextField
          fullWidth
          placeholder="البحث"
          variant="outlined"
          InputProps={{
            disableUnderline: true,
            sx: { border: "none", outline: "none", padding: 0 },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
        />
      </div>
        <div className={"overflow-y-auto max-h-[50vh] mt-4 w-full tapsArea"}>
            <List sx={{ p: 0, m: 0 }}>
                {chats.map((account, index) => (
                    <React.Fragment key={account.name}>
                        <ListItem
                            button
                            onClick={() => onChatClick(account)}
                            className={`chatListItem cursor-pointer  ${
                                selectedChat._id === account._id ? "selectedChat" : ""
                            }`}
                        >
                            <ListItemAvatar>
                                <Avatar>{account.name[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={account.name}
                                secondary={account?.messages?.last.message}
                                primaryTypographyProps={{
                                    background:"#A6CDD7",
                                    borderRadius:"30px"
                                }}
                                className="chatItemText"
                            />
                        </ListItem>
                        {index < accounts.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </div>
      <CreateChatModal show={modalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default ChatList;
