import axios from "axios";
import { Get_Conversatons } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetConversationsAction = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const user_id = user.data._id;
  const api = rootRoute + `/api/v1/conversations/${user_id}`;
  // const api =`http://localhost:8000/api/v1/conversations/${user_id}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(
        api,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: Get_Conversatons,
        payload: {
          chats: response.data.chats,
          meetings: response.data.meetings,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default GetConversationsAction;
