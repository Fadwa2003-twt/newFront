import axios from "axios";
import {
    DELETE_TWEETS,
    FAILED_DELETE_TWEETS,
    START_DELETE_TWEETS,
} from "../../Types";
import {aleartsToast, deleteAlert} from "../../../alearts/alearts";
import {rootRoute} from "../../../Routes/Root.route";


function DeleteStoriesAction (values) {
    const user =  JSON.parse(localStorage.getItem("user"))
    const token = user.token
    const api = rootRoute + "/api/v1/insta/story/delete"
    let data = {}
    let alerts = []
    return async (dispatch) => {

        if(values.url){
            data = {url:values.url,accounts:values.accounts}
        }else if(values.count){
            data = {count:values.count,accounts:values.accounts}
        }
        console.log("this is the dataaaaaaa", data);
        try {
            const result  = await deleteAlert("هل انت متأكد ؟","تريد الان حذف الستوري المحددة" ,"نعم اريد حذف هذه الستوري")
            if (result) {
                dispatch({
                    type: START_DELETE_TWEETS
                })
                const response = await axios.post(
                    api,
                    data, // Send JSON data directly as an object
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json', // Set Content-Type to indicate JSON data
                        },
                    }
                );
                aleartsToast("success","تم حذف الستوري بنجاح ",6000)

                dispatch({
                    type: DELETE_TWEETS,
                    payload:values.id
                })

            }
        } catch (error) {
            dispatch({
                type: FAILED_DELETE_TWEETS
            })
            aleartsToast("error","خطأ !! لم يتم حذف الستوري")
        }
    }
}

export default DeleteStoriesAction