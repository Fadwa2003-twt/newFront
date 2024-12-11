import axios from "axios";
import {FAILED_LOGIN, START_LOGIN, USER_LOGIN} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";
import {aleart, aleartsToast} from "../../../alearts/alearts";



const LoginAction =  (values) => {
    return async (dispatch) => {
        dispatch({
            type:START_LOGIN
        })
        try {
            const response = await axios.post( rootRoute + "/api/v1/auth/login", {
                email: values.email,
                password: values.password,
            });
            localStorage.setItem('user',JSON.stringify(response.data))
            dispatch({
                type:USER_LOGIN,
                payload:response.data.data
            })

            aleart("success","تم تسجيل الدخول بنجاح" )

            return {state:true,data:response.data.data,role:response.data.data.role};
        } catch (error) {
            dispatch({
                type:FAILED_LOGIN
            })

            aleartsToast("error",error.response.data.message)

            return {state:false,data:error.response.data.message};
        }
    }
}

export default LoginAction