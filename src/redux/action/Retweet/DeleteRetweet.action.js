import {
     DELETE_RETWEET,
     FAILED_DELETE_RETWEET,
     START_DELETE_RETWEET,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";

function DeleteRetweetAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/retweet/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_RETWEET
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
            aleartsToast("success","تم حذف الرتويت",6000)

            dispatch({
                type: DELETE_RETWEET,
                payload:values.id
            })
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم حذف الرتويت")
            dispatch({
                type: FAILED_DELETE_RETWEET
            })

        }

    }
}

export default DeleteRetweetAction