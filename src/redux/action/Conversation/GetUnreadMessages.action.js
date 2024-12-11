import axios from "axios";
import { Get_Unread_Messages } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetUnreadMessagesAction = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api = rootRoute + `/api/v1/conversations/unread/${user.data._id}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: Get_Unread_Messages,
        payload: {
          data: response.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default GetUnreadMessagesAction;
