import axios from "axios";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";
import {CREATE_EMPLOYEE, CREATE_EMPLOYEE_CHAT, New_Chat, New_Message} from "../../Types";
import GetConversaton from "./GetConversation.action";

const CreateEmployeeChatAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const user_id = user.data._id;
    return async (dispatch) => {
        try {

            console.log(values);
            const response = await axios.post(
                rootRoute + "/api/v1/conversations/chat",
                {
                    name: values.employee_name,
                    members: [user_id, values.employee_id],
                    type: "chat",
                    date: new Date(),
                },
                {
                    headers: {Authorization: `Bearer ${token}`},
                }
            );
            if (response.data.data) {
                console.log(response.data)
                dispatch({
                  type: New_Chat,
                    payload: response.data,
                })
                // console.log(response.data)
                dispatch(GetConversaton(response.data.data));
                // localStorage.setItem('chat',response.data.data._id );
                aleartsToast("success", response.data.message);
            }else{
                aleartsToast("error", response.data.message);
            }
        } catch (error) {
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateEmployeeChatAction;
