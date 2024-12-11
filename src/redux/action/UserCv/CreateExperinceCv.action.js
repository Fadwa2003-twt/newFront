import axios from "axios";
import {
    Get_Cv,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateExperinceCvAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/usercv/experince";
    return async (dispatch) => {
        try {
            const response = await axios.post(api, {
                id : values.id,
                experince : {company_name : values.company_name, job_role : values.job_role ,details : values.details , date_from : values.date_from , date_to : values.date_to}
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

export default CreateExperinceCvAction