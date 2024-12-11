import axios from "axios";
import { CAPTCHA, FAILED_CAPTCHA, START_CAPTCHA } from "../../Types";
import { rootRoute } from "../../../Routes/Root.route";

const CaptchaAction = (values) => {
  const api = rootRoute + "/api/v1/captchas";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return async (dispatch) => {
    console.log(values);
    dispatch({
      type: START_CAPTCHA,
    });
    try {
      const response = await axios.post(
        api,
        {
          captchaType: values.captchaType,
          captchaKey: values.captchaKey,
        }, // Send JSON data directly as an object
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set Content-Type to indicate JSON data
          },
        }
      );
      dispatch({
        type: CAPTCHA,
      });
    } catch (error) {
      dispatch({
        type: FAILED_CAPTCHA,
      });
    }
  };
};

export default CaptchaAction;
