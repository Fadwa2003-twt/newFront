import axios from "axios";
import {
    DELETE_SOME_DEPARTMENTS,
   FAILED_DELETE_SOME_DEPARTMENTS,
    START_DELETE_SOME_DEPARTMENTS,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteSomeDepartmentsAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/departments/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_SOME_DEPARTMENTS
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف الأقسام المحددة" ,"نعم اريد حذف هذه الحسابات")
            if (result) {
                const response = await axios.post(
                    api,
                    {ids:values.departmentIds}, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );
                dispatch({
                    type: DELETE_SOME_DEPARTMENTS,
                    payload:values.departmentIds
                })
                aleartsToast("success", "تم حذف الأقسام المحددة بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_SOME_DEPARTMENTS
            })
            aleartsToast("error","خطأ !! لم يتم حذف الأقسام المحددة")
        }
    }
}

export default DeleteSomeDepartmentsAction