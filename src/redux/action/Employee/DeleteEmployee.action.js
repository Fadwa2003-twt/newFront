import axios from "axios";
import {
    DELETE_EMPLOYEE,
    FAILED_DELETE_EMPLOYEE,
    START_DELETE_EMPLOYEE,
    DELETE_SOME_EMPLOYEE, DELETE_DEPARTMENT
} from "../../Types";
import {aleartsToast, deleteAlert, selectAleart} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";
import {useSelector} from "react-redux";


function DeleteEmployeeAction(values) {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/users/" + values.id

    const employeesObject = values.employees.reduce((obj, employee) => {
        obj[employee._id] = employee.name;
        return obj;
    }, {});
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_EMPLOYEE
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف موظف" ,"نعم اريد حذف الفريق")
            if (result) {
                const response = await axios.delete(
                    api, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );


                dispatch({
                    type: DELETE_EMPLOYEE,
                    payload: values.id
                })
                aleartsToast("success", "تم حذف الموظف بنجاح")
    }
        }

catch
    (error)
    {
        dispatch({
            type: FAILED_DELETE_EMPLOYEE
        })
        console.log(error)
        aleartsToast("error", "خطأ !! لم يتم حذف الموظف")
    }
    // const result = await selectAleart("اختر الموظف الذي تريد ترحيل المهام له","اختر الموظف")
    // console.log(result)
    // try {
    // const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف موظف" ,"نعم اريد حذف الموظف")
    //         if (result) {
    //             const response = await axios.delete(
    //                 api, // Send JSON data directly as an object
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
    //                     },
    //                 }
    //             );
    //
    //             dispatch({
    //                 type: DELETE_EMPLOYEE,
    //                 payload: values.id
    //             })
    //             aleartsToast("success", "تم حذف الموظف بنجاح")
    //         }
    //     } catch (error) {
    //         dispatch({
    //             type: FAILED_DELETE_EMPLOYEE
    //         })
    //         console.log(error)
    //         aleartsToast("error","خطأ !! لم يتم حذف الموظف")
    //     }
    // }
}
}

export default DeleteEmployeeAction