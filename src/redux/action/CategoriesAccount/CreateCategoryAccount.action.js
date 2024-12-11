import axios from "axios";
import {
    CREATE_CATEGORY_ACCOUNT, CREATE_CATEGORY_TWEETER_ACCOUNT,
    FAILED_CREATE_CATEGORY_ACCOUNT,
    START_CREATE_CATEGORY_ACCOUNT
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateCategoryAccountAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/accountcategories"
    return async (dispatch) => {
        dispatch({
            type: START_CREATE_CATEGORY_ACCOUNT
        })
        try {
            const response = await axios.post(api, {
                name:values.name,
                parent:values.parent
            },{
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: CREATE_CATEGORY_TWEETER_ACCOUNT,
                payload: response.data.data
            })

            // if(values.csvFile){
            //     dispatch(CreateAccountsFileAction({Category:response.data.data._id,csvFile:values.csvFile}));
            // }
            aleartsToast("success","تم اضافة الفئة بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_CATEGORY_ACCOUNT
            })
            console.log(error.response.data)
            aleartsToast("error",error.response.data.errors[0]?.msg)
        }
    }
}

export default CreateCategoryAccountAction