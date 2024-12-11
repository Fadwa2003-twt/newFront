import axios from 'axios';
import {
    FAILED_GET_INSTA_ACCOUNTS,
    GET_INSTA_ACCOUNTS, START_GET_INSTA_ACCOUNTS,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetInstaAccountsAction = (values) => {
    const api = rootRoute + "/api/v1/accounts/insta?page=" + values.page;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_INSTA_ACCOUNTS
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_INSTA_ACCOUNTS,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages,
                    currentPage:response.data.paginationResult.currentPage,
                    next:response.data.paginationResult.next,
                }
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_INSTA_ACCOUNTS
            })
        }
    }
}

export default GetInstaAccountsAction


