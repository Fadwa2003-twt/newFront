import axios from "axios";
import { CREATE_EMPLOYEE,
    FAILED_CREATE_EMPLOYEE,
    START_CREATE_EMPLOYEE,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateEmployeeAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/users"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_EMPLOYEE
        })
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            
            if(values.Category)
            formData.append("Category", values.Category);

            formData.append("role", values.role);
            formData.append("weekEnd", values.weekEnd);
            formData.append("type", values.type);
            formData.append("holidays", values.holidays);
            formData.append("Department", values.Department);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("passwordConfirm", values.passwordConfirm);
            formData.append("profileImg", values.image ? values.image  :null);
            const response = await axios.post(api, formData,{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: CREATE_EMPLOYEE,
                payload: response.data.data
            })
            aleartsToast("success","تم اضافة الموظف بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_EMPLOYEE
            })
            aleartsToast("error",error.response.data.errors[0].msg)
        }
    }
}

export default CreateEmployeeAction