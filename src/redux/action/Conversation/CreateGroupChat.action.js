import axios from "axios";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";



const CreateEmployeeChatAction =  (values) => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token;
    const user_id = user.data._id;
    return async (dispatch) => {
        try {
            console.log(values)
            if(values.date === '') { 
                values.date = new Date();
            }
            const response = await axios.post( rootRoute + "/api/v1/conversations", {
                name: values.title,
                members : [values.users],
                type: 'meeting',
                data: values.date,
            },{
                headers: { Authorization: `Bearer ${token}` }});
            if(response){ 
                aleartsToast("success","تم انشاء الاجتماع بنجاح " )
            }
        } catch (error) {
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateEmployeeChatAction