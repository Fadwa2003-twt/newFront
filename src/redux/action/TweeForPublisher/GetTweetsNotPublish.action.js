import axios from "axios";
import {
    FAILED_GET_TWEETS,
    GET_TWEETS_NOT_PUBLISH,
    START_GET_TWEETS,
} from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const GetTweetsNotPublishAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const api = rootRoute + `/api/v1/methods/tweetsNotPublish`;
    return async (dispatch) => {
        dispatch({
            type: START_GET_TWEETS,
        });
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({
                type: GET_TWEETS_NOT_PUBLISH,
                payload: {
                    data: response.data.data,
                },
            });
        } catch (error) {
            dispatch({
                type: FAILED_GET_TWEETS,
            });
        }
    };
};

export default GetTweetsNotPublishAction;
