import axios from 'axios';
import {
     FAILED_UNLOCK,
    START_UNLOCK, UNLOCK,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const UnlockAction = (values) => {
    const api = rootRoute + '/api/v1/methods/resolve';
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_UNLOCK
        })
        try {
            const response = await axios.post(
                api,
                {
                    accounts:values.accounts,
                    type:values.type,
                }, // Send JSON data directly as an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            dispatch({
                type: UNLOCK,
            })
        } catch (error) {
            dispatch({
                type: FAILED_UNLOCK
            })
        }
    }
}

export default UnlockAction


