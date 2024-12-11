import axios from "axios";
import {
    FAILED_GET_TWEETS,
     GET_TWEETS_FOR_EMPLOYEE,
    START_GET_TWEETS,
} from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetTweetsForEmployeeAction = ({page}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const api = rootRoute + `/api/v1/methods/tweetsNotPublish/${user.data._id}?page=${page}`;
    return async (dispatch) => {
        dispatch({
            type: START_GET_TWEETS,
        });
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({
                type: GET_TWEETS_FOR_EMPLOYEE,
                payload: {
                    data: response.data,
                },
            });
        } catch (error) {
            dispatch({
                type: FAILED_GET_TWEETS,
            });
        }
    };
};

export default GetTweetsForEmployeeAction;
