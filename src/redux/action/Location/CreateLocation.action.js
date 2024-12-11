import axios from "axios";
import {
 CREATE_LOCATION, FAILED_CREATE_LOCATION, START_CREATE_LOCATION,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateLocationAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accounts/binding"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_LOCATION
        })
        try {
            const formData = new FormData();
            formData.append("txtFile", values.fileLocation);
            formData.append("accounts[]", values.accounts);
            formData.append("clear", values.clear);
            formData.append("loopBind", values.loopBind);
            const response = await axios.post(api, formData,{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: CREATE_LOCATION,
            })

            aleartsToast("success","تم اضافة الموقع بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_LOCATION
            })
            aleartsToast("error",error.response.data.message || error.response.data.errors[0].msg)
        }
    }
}

export default CreateLocationAction