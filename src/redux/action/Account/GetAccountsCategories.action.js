import axios from 'axios';
import {FAILED_GET_ACCOUNTS_CATEGORY,
    GET_ACCOUNTS_CATEGORY,
    START_GET_ACCOUNTS_CATEGORY,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetAccountsCategoriesAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + '/api/v1/accounts/categories?' + values.map(category => 'categories=' + category.value).join('&');
    return async (dispatch) => {
        dispatch({
            type: START_GET_ACCOUNTS_CATEGORY
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_ACCOUNTS_CATEGORY,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_ACCOUNTS_CATEGORY
            })
        }
    }
}

export default GetAccountsCategoriesAction


