import {
    FAILED_PUBLISH_TWEET,
    PUBLISH_TWEET,
    START_PUBLISH_TWEET,
} from "../../Types";
import {aleartsToast} from "../../../alearts/alearts";
import axios from "axios";
import {rootRoute} from "../../../Routes/Root.route";
import socket from "../../../socket";

function PublishTweetAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + `/api/v1/methods/tweetsForPublisher`;
    return async (dispatch) => {
        dispatch({
            type: START_PUBLISH_TWEET
        })

        try {

            const response = await axios.post(
                api,
                {
                    ids:values.ids
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                    },
                }
            );
            if(response.data.tweets) {
                response.data.tweets.map(async (tweet) => {
                    const notification = await axios.post(rootRoute + "/api/v1/notifications", {
                        user_id: tweet.employee._id,
                        type: 'alert',
                        notification: ` تم نشر تغريدة جديدة خاصة بك`
                    }, {
                        headers: {Authorization: `Bearer ${token}`}
                    });

                    socket.emit('sendNotification', {
                        user_id: tweet.employee._id,
                        type: 'alert',
                        notification: ` تم نشر تغريدة جديدة خاصة بك`,
                        createdAt: new Date(),
                    })
                })
            }

            dispatch({
                type: PUBLISH_TWEET,
                payload:values.ids
            })
            aleartsToast("success","تم نشر التغريدة بنجاح")
        } catch (error) {
            aleartsToast("error","خطأ !! لم يتم نشر الغريدة")
            dispatch({
                type: FAILED_PUBLISH_TWEET
            })

        }

    }
}

export default PublishTweetAction