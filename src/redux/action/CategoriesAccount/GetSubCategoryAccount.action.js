
import {
  FAILED_GET_SUB_CATEGORIES_ACCOUNT,
  GET_SUB_CATEGORIES_ACCOUNT, START_GET_SUB_CATEGORIES_ACCOUNT,
} from "../../Types";


const GetCategoriesAccountAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_SUB_CATEGORIES_ACCOUNT
        })
        try {

            dispatch({
                type: GET_SUB_CATEGORIES_ACCOUNT,
                payload: values
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_SUB_CATEGORIES_ACCOUNT
            })
        }
    }
}

export default GetCategoriesAccountAction


