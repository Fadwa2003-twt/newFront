import axios from "axios";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";
import socket from "../../../socket";



const CreateNotificationAction =  (values) => {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    return async (dispatch) => {
        try {
            const response = await axios.post( rootRoute + "/api/v1/notifications", {
                user_id: values.employee_id,
                type: values.notification_type,
                notification : values.notification
            },{
                headers: { Authorization: `Bearer ${token}` }});
            socket.emit('sendNotification', {
                user_id: values.employee_id,
                type: values.notification_type,
                notification : values.notification,
                createdAt: new Date(),
            })
            if(response){ 
                aleartsToast("success","تم ارسال الاشعار بنجاح" );
            }
        } catch (error) {
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateNotificationAction