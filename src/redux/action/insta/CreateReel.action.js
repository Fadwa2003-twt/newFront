import axios from "axios";
import {
  CREATE_TWEETS_ACCOUNTS,
  FAILED_CREATE_TWEETS_ACCOUNTS,
  START_CREATE_TWEETS_ACCOUNTS,
  STORE_MESSAGE,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function CreateReelAction(dispatch, { textFileTweet, images, accounts, csvFile }) {
  const api = rootRoute + "/api/v1/insta/reel";
  const formData = new FormData();

  formData.append("video", textFileTweet);
  formData.append("caption", csvFile);

  // Append each image file to the formData
  images.forEach((image) => {
    formData.append("images", image);
  });

  accounts.forEach((account) => {
    formData.append("accounts[]", account);
  });

 //log the caption from the form data
  // console.log(formData.get("caption"), "       ", formData.get("video"), "       ", formData.get("images"), "       ", formData.get("accounts[]") ); 

  return new Promise(async (resolve, reject) => {
    try {
      dispatch({
        type: START_CREATE_TWEETS_ACCOUNTS,
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
        aleartsToast("success", "تم اضافة الرييل بنجاح");
        dispatch({
          type: CREATE_TWEETS_ACCOUNTS,
        });
        dispatch({
          type: STORE_MESSAGE,
          payload: response.data.status,
        });
        resolve(response.data); // Resolve with the response data
      } else {
        dispatch({
          type: FAILED_CREATE_TWEETS_ACCOUNTS,
        });
        if (response.errors) {
          dispatch({
            type: STORE_MESSAGE,
            payload: response.errors,
          });
        }
        aleartsToast("error", `خطأ لم يتم عمل الرييل \n ${response.errors}`);
        reject(response.errors); // Reject with the error message
      }
    } catch (error) {
      dispatch({
        type: FAILED_CREATE_TWEETS_ACCOUNTS,
      });
      aleartsToast("error", `خطأ لم يتم عمل الرييل`);
      // Handle any unexpected errors
      reject("Unexpected error occurred");
    }
  });
}

export default CreateReelAction;