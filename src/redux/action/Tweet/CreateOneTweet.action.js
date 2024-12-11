import axios from "axios";
import {
    CREATE_TWEET,
    FAILED_CREATE_TWEET,
    START_CREATE_TWEET,
} from "../../Types";
import {rootRoute} from "../../../Routes/Root.route";
import {aleartsToast} from "../../../alearts/alearts";

function createOneTweetsAction(values) {
    const api = rootRoute + "/api/v1/methods/tweet";
    const formData = new FormData();

    // Append each image file to the formData
    values.images.forEach((image) => {
        formData.append("images", image);
    });

    formData.append("account", values.account);
    formData.append("tweet", values.tweet);

    return async (dispatch) => {
        dispatch({
            type: START_CREATE_TWEET
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
                type: CREATE_TWEET,
            });

            aleartsToast("success", "تم اضافة التغريدة بنجاح");
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_TWEET,
            });

            aleartsToast("error", "خطأ !! لم يتم التغريدة");
        }
    };
}

export default createOneTweetsAction;
