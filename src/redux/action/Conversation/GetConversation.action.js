import axios from "axios";
import { Get_Conversaton, Add_Message_Conversaton } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetConversationsAction = (values, page = 1) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const chat_id = values._id;
  const api = `${rootRoute}/api/v1/conversations/chat/${chat_id}?page=${page}&limit=20&user_id=${user.data._id}`;

  return async (dispatch) => {

    console.log(values)
    // تحديث الحالة بمجرد استدعاء الدالة
    if (page === 1) {
      dispatch({
        type: Get_Conversaton,
        payload: {
          data: {
            name: values.name,
            chat_id: chat_id,
            messages:[], // رسائل فارغة مبدئياً
          },
        },
      });
    }

    try {
      console.log(values);
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (page > 1) {
        dispatch({
          type: Add_Message_Conversaton,
          payload: {
            data: {
              name: values.name,
              chat_id: chat_id,
              messages: response.data.data,
            },
          },
        });
      } else {
        dispatch({
          type: Get_Conversaton,
          payload: {
            data: {
              name: values.name,
              chat_id: chat_id,
              messages: response.data.data, // تحديث الرسائل بعد استلام الاستجابة
            },
          },
        });
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };
};

export default GetConversationsAction;
