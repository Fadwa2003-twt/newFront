import {aleartsToast} from "../../../alearts/alearts";
import { New_Notification} from '../../Types';


const CreateNotificationAction =  (notification) => {

    return async (dispatch) => {
        console.log("i am entering in action notification",notification)
        try {
            dispatch({
                type : New_Notification,
                payload : notification
            })
        } catch (error) {
            aleartsToast("error",error.response.data.message)
        }
    }
}

export default CreateNotificationAction