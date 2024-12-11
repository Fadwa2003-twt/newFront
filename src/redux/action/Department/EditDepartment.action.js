import axios from "axios";
import {
  EDIT_DEPARTMENT,
  FAILED_EDIT_DEPARTMENT,
  START_EDIT_DEPARTMENT,
} from "../../Types";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";

function EditDepartmentAction(values) {
  console.log({ values });

  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;

  const api = rootRoute + "/api/v1/departments/" + values.id;
  return async (dispatch) => {
    dispatch({
      type: START_EDIT_DEPARTMENT,
    });
    try {
      const response = await axios.put(
        api,
        {
          name: values.name,
          supervisor: values.supervisor,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: EDIT_DEPARTMENT,
        payload: {
          id: values.id,
          updatedDataEdit: response.data.data,
        },
      });
      aleartsToast("success", "تم تعديل الفريق بنجاح");
    } catch (error) {
      dispatch({
        type: FAILED_EDIT_DEPARTMENT,
      });
    }
  };
}

export default EditDepartmentAction;
