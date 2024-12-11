import {
    Get_Conversatons,
    Get_Conversaton,
    New_Message,
    Add_Message_Conversaton,
    Get_Unread_Messages,
    Set_read_Messages,
    Add_UnreadMessage, New_Chat, RESET_CHAT
} from "../Types";

const initialState = {
    chats: [],
    meetings: [],
    chat: { messages: [], name: "", chat_id: "" }, // Ensure messages is an array
    unreadMessages: [],
    unreadMessageCount: 0 // Add field to store the count of unread messages
};

const ConversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Get_Conversatons:
            return { ...state, chats: action.payload.chats, meetings: action.payload.meetings };

        case Get_Conversaton:
            const { messages, name, chat_id } = action.payload.data;
            return { ...state, chat: { messages, name, chat_id } };

        case New_Message: {
            console.log(action.payload);
            const { chat_id, ...message } = action.payload;

            // Ensure messages are arrays

            const updatedChat = state.chat && state.chat.chat_id === chat_id
                ? {
                    ...state.chat,
                    messages: Array.isArray(state.chat.messages)
                        ? [
                            ...state.chat.messages.filter(msg => msg.createdAt !== message.createdAt), // أو استخدم msg._id !== message._id إذا كان متاحًا
                            message
                        ]
                        : [message]
                }
                : state.chat;

            // Calculate unread message count
            const unreadCount = state.unreadMessages.length + 1; // Assuming each new message adds one to unread count

            console.log(updatedChat);
            return { ...state, chat: updatedChat, unreadMessageCount: unreadCount };


        }

        case New_Chat:
            console.log(action.payload);
            return { ...state, chats: [...state.chats,action.payload.data]};

        case Add_Message_Conversaton:
            return {
                ...state,
                chat: {
                    ...state.chat,
                    messages: state.chat.messages.concat(action.payload.data.messages),
                    name: state.chat.name,
                    chat_id: state.chat.chat_id
                }
            };

        case Get_Unread_Messages:
            return { ...state, unreadMessages: action.payload.data };

        case Set_read_Messages: {
            const updatedData = state.unreadMessages.filter(
                message => message.chat_id !== action.payload.chat_id
            );
            return { ...state, unreadMessages: updatedData };
        }

        case Add_UnreadMessage:
            console.log(action.payload);
            const updatedUnreadMessages = [...state.unreadMessages, action.payload];
            updatedUnreadMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // ترتيب الرسائل بحسب الوقت

            return {
                ...state,
                unreadMessages: updatedUnreadMessages,
                unreadMessageCount: state.unreadMessageCount + 1
            };

           case RESET_CHAT:
               return {...state,chat: action.payload}



        default:
            return state;
    }
};

export default ConversationReducer;
