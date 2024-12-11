import axios from "axios";
import {
  CREATE_INSTA_POSTS,
  FAILED_CREATE_INSTA_POSTS_ACCOUNTS,
  START_CREATE_INSTA_POSTS_ACCOUNTS,
  STORE_MESSAGE,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function CreateStoryAction(dispatch, { images, accounts }) {
  const api = rootRoute + "/api/v1/insta/story";
  const formData = new FormData();

  // formData.append("csvFile", textFileTweet);

  // Append each image file to the formData
  images.forEach((image) => {
    formData.append("images", image);
  });

  accounts.forEach((account) => {
    formData.append("accounts[]", account);
  });

  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: START_CREATE_INSTA_POSTS_ACCOUNTS,
      });

      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;

      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        aleartsToast("success", "تم اضافة الستوري بنجاح");
        dispatch({
          type: CREATE_INSTA_POSTS,
        });
        dispatch({
          type: STORE_MESSAGE,
          payload: response.data.status,
        });
        resolve(response.data); // Resolve with the response data
      } else {
        dispatch({
          type: FAILED_CREATE_INSTA_POSTS_ACCOUNTS,
        });
        if (response.errors) {
          dispatch({
            type: STORE_MESSAGE,
            payload: response.errors,
          });
        }
        aleartsToast("error", `خطأ لم يتم عمل ستوري \n ${response.errors}`);
        reject(response.errors); // Reject with the error message
      }
    } catch (error) {
      // Handle any unexpected errors
      reject("Unexpected error occurred");
    }
  });
}

export default CreateStoryAction;