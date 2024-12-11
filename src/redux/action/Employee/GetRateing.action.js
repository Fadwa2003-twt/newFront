import axios from "axios";
import {
     FAILED_GET_RATE,
    GET_RATE,
    START_GET_RATE,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const GetRatingAction = () => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/users/" + user.data._id
    return async (dispatch) => {
        dispatch({
            type: START_GET_RATE
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});

            console.log(api)

            dispatch({
                type: GET_RATE,
                payload: response.data.data
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_RATE
            })
        }
    }
}

export default GetRatingAction