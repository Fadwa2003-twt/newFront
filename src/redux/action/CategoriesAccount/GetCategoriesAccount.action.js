import axios from 'axios';
import {
    FAILED_GET_CATEGORIES_ACCOUNT,
    FAILED_GET_CATEGORIES_TWEETER_ACCOUNT,
    GET_CATEGORIES_ACCOUNT,
    GET_CATEGORIES_TWEETER_ACCOUNT,
    START_GET_CATEGORIES_ACCOUNT,
    START_GET_CATEGORIES_TWEETER_ACCOUNT,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetCategoriesAccountAction = (values) => {
    const api = rootRoute + '/api/v1/accountcategories';
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_CATEGORIES_TWEETER_ACCOUNT
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_CATEGORIES_TWEETER_ACCOUNT,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
            return {state:true,data:response.data.data};
        } catch (error) {
            dispatch({
                type: FAILED_GET_CATEGORIES_TWEETER_ACCOUNT
            })
            return {state:false};
        }
    }
}

export default GetCategoriesAccountAction


