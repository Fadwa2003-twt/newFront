import axios from "axios";
import {
    DELETE_CATEGORY_ACCOUNT,
    DELETE_CATEGORY_INSTA_ACCOUNT,
    FAILED_DELETE_CATEGORY_ACCOUNT,
    FAILED_DELETE_CATEGORY_INSTA_ACCOUNT,
    START_DELETE_CATEGORY_ACCOUNT,
    START_DELETE_CATEGORY_INSTA_ACCOUNT
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function DeleteInstaCategoryAccountAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accountcategories/insta/" + values.id
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_CATEGORY_INSTA_ACCOUNT
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف تصنيف" ,"نعم اريد حذف التصنيف")
            if (result) {
                const response = await axios.delete(api, {
                    headers: {Authorization: `Bearer ${token}`}
                });


                dispatch({
                    type: DELETE_CATEGORY_INSTA_ACCOUNT,
                    payload: values.id
                })
                aleartsToast("success", "تم حذف الصنف بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_CATEGORY_INSTA_ACCOUNT
            })
            aleartsToast("error","خطأ !! لم يتم حذف الصنف")
        }
    }
}

export default DeleteInstaCategoryAccountAction