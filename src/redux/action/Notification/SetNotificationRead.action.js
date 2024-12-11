import axios from "axios";
import { rootRoute } from "../../../Routes/Root.route";

const SetNotificationReadAction = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const user_id = user.data._id;
  const api = rootRoute + `/api/v1/notifications/read/${user_id}`;
  return async (dispatch) => {
    try {
      const response = await axios.get(api, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default SetNotificationReadAction;
