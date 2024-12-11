
import {RESET_CHAT} from "../../Types";

const ResetChat = () => {

    return (dispatch) => {

        dispatch({
            type: RESET_CHAT,
            payload: { messages: [], name: "", chat_id: "" },
        });
    };
};


export default ResetChat