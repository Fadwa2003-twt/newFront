import axios from "axios";
import {
 DELETE_SOME_ACCOUNTS,
    FAILED_DELETE_SOME_ACCOUNTS,
  START_DELETE_SOME_ACCOUNTS
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteSomeAccountsAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accounts/delete/tweet"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_SOME_ACCOUNTS
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف الحسابات المحددة" ,"نعم اريد حذف هذه الحسابات")
            if (result) {
                const response = await axios.post(
                    api,
                    {accounts:values.accountsIds}, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );
                dispatch({
                    type: DELETE_SOME_ACCOUNTS,
                    payload:values.accountsIds
                })
                aleartsToast("success", "تم حذف الحسابات  المحددة بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_SOME_ACCOUNTS
            })
            aleartsToast("error","خطأ !! لم يتم حذف الحسابات المحددة")
        }
    }
}

export default DeleteSomeAccountsAction