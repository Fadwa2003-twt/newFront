import axios from "axios";
import {
  EDIT_CATEGORY_ACCOUNT,
  EDIT_CATEGORY_INSTA_ACCOUNT,
  FAILED_EDIT_CATEGORY_INSTA_ACCOUNT,
  START_EDIT_CATEGORY_INSTA_ACCOUNT,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function EditInstaCategoryAccountAction(values) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const api = rootRoute + "/api/v1/accountcategories/insta/" + values.id;
  return async (dispatch) => {
    dispatch({
      type: START_EDIT_CATEGORY_INSTA_ACCOUNT,
    });
    try {
      const response = await axios.put(
          api,
          {
            name: values.name,
            parent: values.parent,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
      );
      dispatch({
        type: EDIT_CATEGORY_INSTA_ACCOUNT,
        payload: {
          id: response.data.data._id,
          updatedDataEdit: response.data.data,
        },
      });
      aleartsToast("success", "تم تعديل الصنف بنجاح");
    } catch (error) {
      dispatch({
        type: FAILED_EDIT_CATEGORY_INSTA_ACCOUNT,
      });
      console.log(error.response.data);
      aleartsToast("error", error.response.data.errors[0].msg);
    }
  };
}

export default EditInstaCategoryAccountAction;
