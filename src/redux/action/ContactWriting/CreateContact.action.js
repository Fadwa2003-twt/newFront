import axios from "axios";
import {
    CREATE_CONTACTS_WRIRING,
    FAILED_CREATE_CONTACTS_WRIRING,
    START_CREATE_CONTACTS_WRIRING,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateContactAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + '/api/v1/contents';
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_CONTACTS_WRIRING
        })
        try {
            const formData = new FormData();
            formData.append("tweetFile", values.tweetFile);
            values.images.forEach((image) => {
                formData.append("images", image);
            });
            formData.append("category", values.category);
            formData.append("contentWriting",user.data._id)

            const response = await axios({
                method:"post",
                url:api,
                data:formData,
                headers: { Authorization: `Bearer ${token}`}
               });

            dispatch({
                type: CREATE_CONTACTS_WRIRING,
                payload: response.data.data
            })
            aleartsToast("success","تم اضافة المحتوى بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_CONTACTS_WRIRING
            })
            aleartsToast("error","خطأ !! لم يتم تعديل الصنف")
        }
    }
}

export default CreateContactAction