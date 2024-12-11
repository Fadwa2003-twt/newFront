import axios from "axios";
import {
    CREATE_CATEGORY,
     FAILED_CREATE_CATEGORY, START_CREATE_CATEGORY,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateCategoryAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/categories"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_CATEGORY
        })
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('supervisor', values.supervisor);

            // إضافة الملفات (textFiles) إلى FormData
            values.textFiles?.forEach((file) => {
                formData.append('textFiles', file);
            });
            const response = await axios.post(api, formData,{
                headers: { Authorization: `Bearer ${token}`,
                     },
            });
            console.log(response.data)
            dispatch({
                type: CREATE_CATEGORY,
                payload: response.data.data
            })
            aleartsToast("success","تم اضافة الفئة بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_CATEGORY
            })
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateCategoryAction