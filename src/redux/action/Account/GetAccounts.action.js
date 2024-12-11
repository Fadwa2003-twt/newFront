import axios from 'axios';
import {
    FAILED_GET_ACCOUNTS,
    GET_ACCOUNTS, START_GET_ACCOUNTS,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetAccountsAction = (values) => {
    const api = rootRoute + "/api/v1/accounts/tweet?page=" + values.page;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_ACCOUNTS
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_ACCOUNTS,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages,
                    currentPage:response.data.paginationResult.currentPage,
                    next:response.data.paginationResult.next,
                }
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_ACCOUNTS
            })
        }
    }
}

export default GetAccountsAction


