import axios from "axios";
import {
    CREATE_TWEET_FOR_PUBLISHER, FAILED_CREATE_TWEET_FOR_PUBLISHER, START_CREATE_TWEET_FOR_PUBLISHER,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";

function CreateTweetForPublisherAction ({ textFileTweet, images, accounts }) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/methods/tweetAccountsPublisher"
    const formData = new FormData();
    formData.append("csvFile", textFileTweet);
    // Append each image file to the formData
    images.forEach((image) => {
        formData.append("images", image);
    });
    accounts.forEach((account) => {
        formData.append("accounts[]", account);
    });

    formData.append("employeeId", user.data._id);

    return async (dispatch) => {
        dispatch({
            type: START_CREATE_TWEET_FOR_PUBLISHER
        })
        try {
            const response = await axios.post(api, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            // const notification = await axios.post( rootRoute + "/api/v1/notifications", {
            //     user_id: values.assignTo,
            //     type: 'alert',
            //     notification : `تم تعيين مهمة جديدة ${values.name}`
            // },{
            //     headers: { Authorization: `Bearer ${token}` }});

            // socket.emit('sendNotification', {
            //     user_id: values.assignTo,
            //     type: 'alert',
            //     notification : `تم تعيين مهمة جديدة ${values.name}`,
            //     createdAt: new Date(),
            // })
            dispatch({
                type: CREATE_TWEET_FOR_PUBLISHER,
                payload: response.data.data
            })
            aleartsToast("success","تم ارسال التغريدة بنجاح")
        } catch (error) {
            dispatch({
                type: FAILED_CREATE_TWEET_FOR_PUBLISHER
            })
            aleartsToast("error","خطأ !! لم يتم ارسال التغريدة")
        }
    }
}

export default CreateTweetForPublisherAction