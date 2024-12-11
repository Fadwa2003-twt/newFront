import axios from "axios";
import {
  CREATE_TWEETS_ACCOUNTS,
  FAILED_CREATE_TWEETS_ACCOUNTS,
  START_CREATE_TWEETS_ACCOUNTS,
  STORE_MESSAGE,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function createTweetsAccountsAction({ textFileTweet, images, accounts }) {
  const api = rootRoute + "/api/v1/methods/tweetAccounts";
  const formData = new FormData();

  console.log("action => " + accounts);

  formData.append("csvFile", textFileTweet);

  // Append each image file to the formData
  images.forEach((image) => {
    formData.append("images", image);
  });

  accounts.forEach((account) => {
    formData.append("accounts[]", account);
  });

  return async (dispatch) => {
    dispatch({
      type: START_CREATE_TWEETS_ACCOUNTS,
    });
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

    try {
      const response = await axios.post(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        aleartsToast("success", "تم اضافة التغريدة بنجاح");
        dispatch({
          type: CREATE_TWEETS_ACCOUNTS,
        });
        dispatch({
          type: STORE_MESSAGE,
          payload: response.data.status,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_CREATE_TWEETS_ACCOUNTS,
      });

      // تحقق مما إذا كانت هناك أخطاء في الاستجابة
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors
            .map((error) => {
              const account = error.account ? `Account: ${error.account}\n` : "";
              const errorDetails = error.errors.join(", ");
              return `${account}Errors: ${errorDetails}`;
            })
            .join("\n\n");

        dispatch({
          type: STORE_MESSAGE,
          payload: error.response.data.errors,
        });

        aleartsToast("error", `خطأ !! لم يتم التغريدة\n\n${errorMessages}`);
      } else {
        aleartsToast("error", "حدث خطأ غير متوقع أثناء تنفيذ العملية.");
      }
    }
  };
}

export default createTweetsAccountsAction;
