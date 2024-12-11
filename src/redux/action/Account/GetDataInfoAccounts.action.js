import axios from 'axios';
import {
    FAILED_GET_DATA_INFO,
     GET_DATA_INFO, START_GET_DATA_INFO,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";
import {aleartsToast} from "../../../alearts/alearts";
import GetAccountsEmployeeAction from "./GetAccountsEmployee.action";


const GetDataInfoAccounts = (values) => {
    const api = rootRoute + '/api/v1/accounts/data';
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        dispatch({
            type: START_GET_DATA_INFO
        })
        try {
            const response = await axios.post(
                api,
                {
                    accounts:values.accounts,
                }, // Send JSON data directly as an object
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            // dispatch(GetAccountsEmployeeAction())

            aleartsToast("success", "تم تحديث بيانات الحسابات المحددة بنجاح")
            let textAlert = ""
            response.data.data.map((account) => {
                if(!account.status) {
                    textAlert = textAlert + " (" + account.account +") " + account.message + "\n"
                }
            })
            if(textAlert){
                // aleartsToast("error", textAlert ,8000)
            }
            dispatch({
                type: GET_DATA_INFO,
                payload:response.data.data
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_DATA_INFO
            })
        }
    }
}

export default GetDataInfoAccounts


