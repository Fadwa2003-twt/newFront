import axios from "axios";
import {
    EDIT_CATEGORY,
    FAILED_EDIT_CATEGORY, START_EDIT_CATEGORY,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function EditCategoryAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/categories/" + values.id
    return async (dispatch) => {
        dispatch({
            type: START_EDIT_CATEGORY
        })
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('supervisor', values.supervisor);

            values.textFiles?.forEach((file) => {
                formData.append('textFiles', file);
            });
            const response = await axios.put(api, formData,{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: EDIT_CATEGORY,
                payload: {
                    id: response.data.data._id,
                    updatedDataEdit:response.data.data
                }
            })
            aleartsToast("success","تم تعديل الفئة بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_EDIT_CATEGORY
            })
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default EditCategoryAction