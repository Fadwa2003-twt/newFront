import axios from "axios";
import {
    Get_Cv,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function UpdateUserCvAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/usercv/update";
    return async (dispatch) => {
        try {
            const response = await axios.post(api, {
                id: values.id,
                name : values.name,
                email : values.email,
                phone : values.phone,
                address : values.address,
                job_name : values.job_name
            },{
                headers: { Authorization: `Bearer ${token}` }});
                dispatch({
                    type: Get_Cv,
                    payload: {
                        data:response.data.data,
                    }
                })
            aleartsToast("success","تم حفظ البيانات بنجاح")
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم حفظ البيانات")
        }
    }
}

export default UpdateUserCvAction