import axios from "axios";
import {
    Get_Charts
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const GetChartsAction = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/charts?user_id=" + user.data._id;
    return async (dispatch) => {
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: Get_Charts,
                payload: {
                    data:response.data.data,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default GetChartsAction