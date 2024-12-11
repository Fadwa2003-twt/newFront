import axios from "axios";
import {
    DELETE_ACCOUNT, FAILED_DELETE_ACCOUNT, START_DELETE_ACCOUNT,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteAccountAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accounts/"+values.id
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_ACCOUNT
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف هذا الحساب" ,"نعم اريد حذف هذه الحسابات")
            if (result) {
                const response = await axios.delete(api ,{
                    headers: {Authorization: `Bearer ${token}`}
                });

                dispatch({
                    type: DELETE_ACCOUNT,
                    payload:values.id
                })
                aleartsToast("success", "تم حذف الحساب بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_ACCOUNT
            })
            aleartsToast("error","خطأ !! لم يتم حذف الحساب")
        }
    }
}

export default DeleteAccountAction