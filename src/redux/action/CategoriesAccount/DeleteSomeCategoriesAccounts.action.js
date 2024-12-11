import axios from "axios";
import {
  DELETE_SOME_CATEGORIES_ACCOUNTS,
   FAILED_DELETE_SOME_CATEGORIES_ACCOUNTS,
   START_DELETE_SOME_CATEGORIES_ACCOUNTS,

} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteSomeCategoriesAccountsAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accountcategories/someDelete"
    console.log(values)
    return async (dispatch) => {
        dispatch({
            type: START_DELETE_SOME_CATEGORIES_ACCOUNTS
        })
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف الفئات المحددة" ,"نعم اريد حذف هذه الحسابات")
            if (result) {
                const response = await axios.post(
                    api,
                    {ids:values.categoriesIds}, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );
                dispatch({
                    type: DELETE_SOME_CATEGORIES_ACCOUNTS,
                    payload:values.categoriesIds
                })
                aleartsToast("success", "تم حذف الفئات المحددة بنجاح")
            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_SOME_CATEGORIES_ACCOUNTS
            })
            aleartsToast("error","خطأ !! لم يتم حذف الفئات المحددة")
        }
    }
}

export default DeleteSomeCategoriesAccountsAction