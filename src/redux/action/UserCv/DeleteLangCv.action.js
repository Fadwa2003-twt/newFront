import axios from "axios";
import {Get_Cv} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";

const DeleteLangCvAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api =rootRoute + `/api/v1/usercv/lang/delete/${values.id}/${values.lang_id}`
    return async (dispatch) => {
        try {
            const response = await axios.get(api, {
                headers: { Authorization: `Bearer ${token}` }});
            dispatch({
                type: Get_Cv,
                payload: {
                    data:response.data.data,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default DeleteLangCvAction