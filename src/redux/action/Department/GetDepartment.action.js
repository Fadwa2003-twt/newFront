import axios from 'axios';
import {
     FAILED_GET_DEPARTMENT,
    GET_DEPARTMENT, START_GET_DEPARTMENT,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";


const GetDepartmentAction = ({page = 1,limit = 10}) => {
    const api = rootRoute + `/api/v1/departments?page=${page}?limit=${limit}`;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_DEPARTMENT
        })
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: GET_DEPARTMENT,
                payload:{
                    data:response.data.data,
                    numberOfPages:response.data.paginationResult.numberOfPages
                }
            })
            // return {state:true,data:response.data.data};
        } catch (error) {
            dispatch({
                type: FAILED_GET_DEPARTMENT
            })
            // return {state:false,data:error.response.data.message};
        }
    }
}

export default GetDepartmentAction


