import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";
import {aleartsToast} from "../../../alearts/alearts";

const api = rootRoute + '/api/v1/auth/signup';
export const SignUpAction =  (userData) => async (dispatch) => {
    try {
        const response = await axios.post(api, userData);
        const data = response.data;
        dispatch({ type: 'SIGN_UP_SUCCESS', payload: data });
        aleartsToast("success","تمت تسجيل حسابك بنجاح")
    } catch (error) {
        dispatch({ type: 'SIGN_UP_ERROR', payload: error.message });
        aleartsToast("error",error.response.data.message)
    }
}