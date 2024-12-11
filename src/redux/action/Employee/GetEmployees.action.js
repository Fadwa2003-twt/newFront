import axios from "axios";
import {
    FAILED_GET_EMPLOYEES,
    GET_EMPLOYEES,
    START_GET_EMPLOYEES,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const GetEmployeesAction = ({page = 1,limit = 10}) => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + `/api/v1/users?page=${page}?limit=${limit}`
    return async (dispatch) => {
        dispatch({
            type: START_GET_EMPLOYEES
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_EMPLOYEES,
                payload: {
                    data:response.data.data,
                    numberOfPages:response.data.page
                }
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_EMPLOYEES
            })
        }
    }
}

export default GetEmployeesAction