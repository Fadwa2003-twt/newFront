import axios from "axios";
import { Set_read_Messages } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const SetConversationReadAction = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const chat_id = values.chat_id;
  const api =
    rootRoute +
    `/api/v1/conversations/markread/${user.data._id}&chat_id=${chat_id}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: Set_read_Messages,
        payload: {
          data: response.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default SetConversationReadAction;
