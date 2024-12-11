import axios from "axios";
import {
    New_Cv,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateUserCvAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/usercv";
    return async (dispatch) => {
        try {
            const response = await axios.post(api, {
                user_id : user.data._id,
                name : values.name,
                email : values.email,
                phone : values.phone,
                address : values.address,
                job_name : values.job_name
            },{
                headers: { Authorization: `Bearer ${token}` }});
                dispatch({
                    type: New_Cv,
                    payload: response.data.data
                })
            aleartsToast("success","تم حفظ البيانات بنجاح")
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم حفظ البيانات")
        }
    }
}

export default CreateUserCvAction