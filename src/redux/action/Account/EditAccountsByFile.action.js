import axios from "axios";
import {
    EDIT_ACCOUNTS_FILE,
    FAILED_EDIT_ACCOUNTS_FILE,
    START_EDIT_ACCOUNTS_FILE,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";

function EditAccountsByFileAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = ""
    return async (dispatch) => {
        dispatch({
            type: START_EDIT_ACCOUNTS_FILE
        })
        try {
            const formData = new FormData();

            const response = await axios.put(api, formData,{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: EDIT_ACCOUNTS_FILE,
                payload: {
                    id: response.data.data._id,
                    updatedDataEdit:response.data.data
                }
            })
            aleartsToast("success","تم تعديل الحساب بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_EDIT_ACCOUNTS_FILE
            })
            aleartsToast("error","خطأ !! لم يتم تعديل الحساب")
        }
    }
}

export default EditAccountsByFileAction