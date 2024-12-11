import axios from "axios";
import {Get_Notifications} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const GetNotificationsAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token;
    const user_id = user.data._id;
    const api =rootRoute + `/api/v1/notifications/${user_id}`;
    return async (dispatch) => {
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: Get_Notifications,
                payload: {
                    data:response.data.notifications,
                }
            })
            console.log(response.data.notifications)

        } catch (error) {
            console.log(error);
        }
    }
}

export default GetNotificationsAction