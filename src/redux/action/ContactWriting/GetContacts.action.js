
import axios from "axios";
import {FAILED_GET_CONTACTS_WRIRING, GET_CONTACTS_WRIRING,
     START_GET_CONTACTS_WRIRING,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const GetContactsWritingAction = (values) => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + '/api/v1/contents?' + "contentWriting=" + user.data._id;

    return async (dispatch) => {
        dispatch({
            type: START_GET_CONTACTS_WRIRING
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_CONTACTS_WRIRING,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
            return {state:true,data:response.data};
        } catch (error) {
            dispatch({
                type: FAILED_GET_CONTACTS_WRIRING
            })
            return {state:false};
        }
    }
}

export default GetContactsWritingAction

