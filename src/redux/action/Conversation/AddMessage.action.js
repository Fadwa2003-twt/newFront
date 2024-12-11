import {aleartsToast} from "../../../alearts/alearts";
import {New_Message , Message_Count , Add_UnreadMessage} from "../../Types";
import store from "../../store"

const AddMessageAction =  (values) => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const chat = localStorage.getItem("chat");
    const token = user.token;
    const user_id = user.data._id;
    const chats = store.getState().conversations.chats;
    console.log(chats)
    values.data.chat_name = chats.filter(obj => obj._id === values.data.chat_id)[0]?.name;

    return async (dispatch, getState) => {
        const state = getState(); // الحصول على الحالة الحالية للتطبيق

        // التحقق مما إذا كانت الرسالة موجودة بالفعل في قائمة الرسائل غير المقروءة
        const isMessageExists = state.conversations.unreadMessages.some(message => message._id === values.data._id);

        if (!isMessageExists) { // إذا لم تكن الرسالة موجودة بالفعل، قم بإضافتها
            if (chat == values.data.chat_id) {
                dispatch({
                    type: New_Message,
                    payload: values.data,
                });
            } else {
                dispatch({
                    type: Add_UnreadMessage,
                    payload: values.data,
                });
            }
        }
    };
};


export default AddMessageAction