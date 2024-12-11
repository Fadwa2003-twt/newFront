import axios from "axios";
import {
    CREATE_REPLY_ACCOUNTS,
    FAILED_CREATE_REPLY_ACCOUNTS,
    START_CREATE_REPLY_ACCOUNTS,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function createTweetsAccountsAction({ url,textFile, accounts }) {
    const api = rootRoute + "/api/v1/methods/reply";
    const formData = new FormData();

    formData.append("txtFile", textFile);
    formData.append("url", url);

    accounts.forEach((account) => {
        formData.append("accounts[]", account);
    });

    return async (dispatch) => {
        dispatch({
            type: START_CREATE_REPLY_ACCOUNTS,
        });

        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user.token;

            const response = await axios.post(
                api,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            dispatch({
                type: CREATE_REPLY_ACCOUNTS,
            });

            aleartsToast("success", "تم اضافة التعليق بنجاح");
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_REPLY_ACCOUNTS,
            });

            aleartsToast("error", "خطأ !! لم يتم اضافة التعليق");
        }
    };
}

export default createTweetsAccountsAction;
