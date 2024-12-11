import axios from 'axios';
import {
     FAILED_GET_LOCATION,
   GET_LOCATION, START_GET_LOCATION,
} from "../../Types";

const api = '';

const GetLocations = (values) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_LOCATION
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_LOCATION,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
            return {state:true,data:response.data.data};
        } catch (error) {
            dispatch({
                type: FAILED_GET_LOCATION
            })
            return {state:false,data:error.response.data.message};
        }
    }
}

export default GetLocations


