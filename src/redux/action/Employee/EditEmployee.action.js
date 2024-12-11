import axios from "axios";
import {
    EDIT_EMPLOTEE,
    FAILED_EDIT_EMPLOTEE,
    START_EDIT_EMPLOTEE
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function EditEmployeeAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/users/" + values.id
    const apiChangePassword = rootRoute + "/api/v1/users/changePassword/" + values.id
    return async (dispatch) => {
        const email = values.email ? {email:values.email} : null
        dispatch({
            type: START_EDIT_EMPLOTEE
        })
        try {
            const response = await axios.put(api, {
                name:values.name,
                holidays: values.holidays,
                type : values.type,
                Category:values.Category,
                role:values.role,
                active:values.active,
                Department:values.Department,
                ...email
                ,
            },{
                headers: { Authorization: `Bearer ${token}` }});
            if (values.password && values.passwordConfirm && values.currentPassword){
                const response = await axios.put(apiChangePassword, {
                    password:values.password,
                    passwordConfirm:values.passwordConfirm,
                    currentPassword:values.currentPassword,
                },{
                    headers: { Authorization: `Bearer ${token}` }});
            }
            dispatch({
                type: EDIT_EMPLOTEE,
                payload: response.data.data
            })
            aleartsToast("success","تم تعديل بيانات الموظف بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_EDIT_EMPLOTEE
            })
            aleartsToast("error","خطأ !! لم يتم تعديل بيانات الموظف")
        }
    }
}

export default EditEmployeeAction