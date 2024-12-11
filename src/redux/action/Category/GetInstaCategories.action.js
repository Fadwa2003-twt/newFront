import axios from 'axios';
import {
    FAILED_GET_CATEGORIES,
    GET_CATEGORIES,
     START_GET_CATEGORIES,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetInstaCategoriesAction = (values) => {
    const api = rootRoute + "/api/v1/categories/insta?page=" + values.page;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_CATEGORIES
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_CATEGORIES,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
            return {state:true,data:response.data.data};
        } catch (error) {
            dispatch({
                type: FAILED_GET_CATEGORIES
            })
            return {state:false};
        }
    }
}

export default GetInstaCategoriesAction


