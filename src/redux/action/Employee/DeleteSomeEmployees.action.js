import axios from "axios";
import {
    DELETE_SOME_EMPLOYEE, FAILED_DELETE_SOME_EMPLOYEE,
    START_DELETE_SOME_DEPARTMENTS, START_DELETE_SOME_EMPLOYEE,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteSomeEmployeesAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/users/delete"
    // const api = "http://localhost:8000/api/v1/users/delete"
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_SOME_EMPLOYEE
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف الموظفين المحددة" ,"نعم اريد حذف هذه الحسابات")
            if (result) {
                const response = await axios.post(
                    api,
                    {ids:values.employeesIds}, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );
                dispatch({
                    type: DELETE_SOME_EMPLOYEE,
                    payload:values.employeesIds
                })
                aleartsToast("success", response.data.message)
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_SOME_EMPLOYEE
            })
            aleartsToast("error","خطأ !! لم يتم حذف الموظفين المحددة")
        }
    }
}

export default DeleteSomeEmployeesAction