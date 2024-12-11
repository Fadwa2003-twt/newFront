import axios from "axios";
import {
    Get_Cv,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function ExpertiseUserCvAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/usercv/expertise";
    return async (dispatch) => {
        try {
            const response = await axios.post(api, {
                id : values.id,
                expertise : values.expertise
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

export default ExpertiseUserCvAction