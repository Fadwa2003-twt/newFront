import axios from "axios";
import {
    CREATE_DEPARTMENT,
    FAILED_CREATE_DEPARTMENT,
    START_CREATE_DEPARTMENT
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateDepartmentAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api =rootRoute +  "/api/v1/departments"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_DEPARTMENT
        })
        if(values.supervisor === "") values.supervisor = null;
        try {
            const response = await axios.post(api, {
                name:values.name,
                supervisor:values.supervisor
            },{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: CREATE_DEPARTMENT,
                payload: response.data.data
            })

            aleartsToast("success","تم اضافة الفريق بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_DEPARTMENT
            })
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateDepartmentAction