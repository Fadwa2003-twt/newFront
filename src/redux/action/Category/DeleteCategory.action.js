import axios from "axios";
import {
    DELETE_CATEGORY,
    FAILED_DELETE_CATEGORY,
    START_DELETE_CATEGORY,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function DeleteCategoryAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/categories/" + values.id
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_CATEGORY
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف فئة" ,"نعم اريد حذف الفئة")
            if (result) {
                const response = await axios.delete(api, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                dispatch({
                    type: DELETE_CATEGORY,
                    payload: values.id
                })
                aleartsToast("success", "تم حذف الفئة بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_CATEGORY
            })
            aleartsToast("error","خطأ !! لم يتم حذف الفئة")
        }
    }
}

export default DeleteCategoryAction