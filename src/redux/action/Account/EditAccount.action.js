import axios from "axios";
import {
    EDIT_ACCOUNT,
    FAILED_EDIT_ACCOUNT,
    START_EDIT_ACCOUNT,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function EditAccountAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accounts/" + values.id
    return async (dispatch) => {
        dispatch({
            type: START_EDIT_ACCOUNT
        })
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("Category", values.Category);
            formData.append("profileImg", values.profileImg);
            formData.append("description", values.description);
            formData.append("password", values.password);

            const response = await axios.put(api, formData,{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: EDIT_ACCOUNT,
                payload: {
                    id: response.data.data._id,
                    updatedDataEdit:response.data.data
                }
            })
            aleartsToast("success","تم تعديل الحساب بنجاح")
        }   catch (error) {
            dispatch({
                type: FAILED_EDIT_ACCOUNT
            })
            aleartsToast("error","خطأ !! لم يتم تعديل الحساب")
        }
    }
}

export default EditAccountAction