import {
    CREATE_RETWEET,
    FAILED_CREATE_RETWEET,
    START_CREATE_RETWEET,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";

function CreateRetweetAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/retweet"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_RETWEET
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
            aleartsToast("success","تم عمل رتويت بنجاح",6000)

            dispatch({
                type: CREATE_RETWEET,
                payload:values.id
            })
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم عمل رتويت")
            dispatch({
                type: FAILED_CREATE_RETWEET
            })

        }

    }
}

export default CreateRetweetAction