import {
    FAILED_SHOW_TWEET,
    SHOW_TWEET,
    START_SHOW_TWEET,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";

function ShowTweetAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/tweet/view"
    return async (dispatch) => {
        dispatch({
            type: START_SHOW_TWEET
        })

        try {

            const response = await axios.post(
                api,
                {
                    accounts:values.accounts,
                    url:values.url
                }, // Send JSON data directly as an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            dispatch({
                type: SHOW_TWEET,
                payload:values.id
            })
            aleartsToast("success","تم عرض التغريدة بنجاح")
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم جلب بيانات الغريدة")
            dispatch({
                type: FAILED_SHOW_TWEET
            })

        }

    }
}

export default ShowTweetAction