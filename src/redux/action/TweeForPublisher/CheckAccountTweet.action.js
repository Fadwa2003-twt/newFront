import axios from "axios";
import {
    CHECK_ACCOUNT_TWEET, FAILED_CHECK_ACCOUNT_TWEET,
    START_CHECK_ACCOUNT_TWEET,
} from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";
import { aleartsToast } from "../../../alearts/alearts";

const CheckAccountTweetAction = (values) => {
    const api = rootRoute + "/api/v1/accounts/check";
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    return async (dispatch) => {
        if (values.accounts.length === 0) {
            aleartsToast("error", "يرجى اختيار بعض الحسابات");
        } else {
            dispatch({
                type: START_CHECK_ACCOUNT_TWEET,
            });
            // try {
                const response = await axios.post(
                    api,
                    {
                        accounts: values.accounts,
                        userAgent: "mobile",
                        clear: values.clear,
                    }, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json", // Set Content-Type to indicate JSON data
                        },
                    }
                );
                dispatch({
                    type: CHECK_ACCOUNT_TWEET,
                    payload: response.data.data,
                });
            // } catch (error) {
            //     aleartsToast("error", error.message, 8000);
            //     dispatch({
            //         type: FAILED_CHECK_ACCOUNT_TWEET,
            //     });
            // }
        }
    };
};

export default CheckAccountTweetAction;
