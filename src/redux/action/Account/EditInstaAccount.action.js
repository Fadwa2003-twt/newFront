import axios from "axios";
import {
  CREATE_TWEET,
  FAILED_EDIT_ACCOUNT,
  START_CREATE_TWEET,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function EditInstaAccountAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api = rootRoute + "/api/v1/insta/accounts/" + values.id;
  const formData = new FormData();
  formData.append("csvFile", "");
  if (values.profileImg) {
    formData.append("images", values.profileImg);
  } else {
    formData.append("images", "[0]");
  }
  formData.append("name", values.name);
  formData.append("password", values.password);
  formData.append("description", values.description);
  formData.append("category", values.Category);

  return async (dispatch) => {
    dispatch({
      type: START_CREATE_TWEET,
    });
    try {
      const response = await axios.put(api, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200 && response.data.errors.length > 0) {
        aleartsToast("warning", response.data.message);
      } else {
        aleartsToast("success", "تم تعديل الحساب بنجاح");
      }

      dispatch({
        type: CREATE_TWEET,
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: EditInstaAccount.action.js ~ line 57 ~ return ~ error",
        error
      );
      dispatch({
        type: CREATE_TWEET,
      });
      aleartsToast("error", "خطأ !! لم يتم تعديل الحساب");
    }
  };
}

export default EditInstaAccountAction;
