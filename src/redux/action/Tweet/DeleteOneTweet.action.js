import {
    DELETE_ONE_TWEET,
     FAILED_DELETE_ONE_TWEET,
    START_DELETE_ONE_TWEET,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";

function DeleteOneTweetAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/tweet/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_ONE_TWEET
        })

        try {

            const response = await axios.post(
                api,
                {
                    account:values.account,
                    url:values.url
                }, // Send JSON data directly as an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            aleartsToast("success","تم حذف التغريدة",6000)
            dispatch({
                type: DELETE_ONE_TWEET,
                payload:values.id
            })
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم حذف التغريدة")
            dispatch({
                type: FAILED_DELETE_ONE_TWEET
            })

        }

    }
}

export default DeleteOneTweetAction