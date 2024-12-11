import axios from "axios";
import {
    DELETE_FILE_CATEGORY,
    FAILED_DELETE_FILE_CATEGORY,
    START_DELETE_FILE_CATEGORY,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function DeleteFileCategoryAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute +"/api/v1/categories/delete/file"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_FILE_CATEGORY
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف ملف" ,"نعم اريد حذف الفئة")
            if (result) {
                const response = await axios.post(api, {
                    file:values.file,
                    categoryId:values.categoryId
                },{
                    headers: {Authorization: `Bearer ${token}`}
                });

                dispatch({
                    type: DELETE_FILE_CATEGORY,
                    payload: {
                        categoryId:values.categoryId,
                        file:values.file
                    }
                })
                aleartsToast("success", "تم حذف الملف بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_FILE_CATEGORY
            })
            aleartsToast("error","خطأ !! لم يتم حذف الملف")
        }
    }
}

export default DeleteFileCategoryAction