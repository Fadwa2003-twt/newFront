import axios from "axios";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";
import socket from "../../../socket";

const CreateMeetingChatAction = (values) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  return async (dispatch) => {
    try {
      console.log(values);
      if (values.assignOn === "") {
        values.assignOn = new Date();
      }
      const response = await axios.post(
        rootRoute + "/api/v1/conversations/meeting",
        {
          name: values.title,
          members: values.members,
          type: "group",
          date: values.assignOn,
        },{
            headers: { Authorization: `Bearer ${token}` }});

      values.members.map( async (member,index) =>  {
          const notification = await axios.post( rootRoute + "/api/v1/notifications", {
              user_id: member,
              type: 'alert',
              notification : `تم اضافة اجتماع جديد ${values.title}`
          },{
              headers: { Authorization: `Bearer ${token}` }});

        socket.emit('sendNotification', {
              user_id: member,
              type: 'alert',
              notification: `تم اضافتك الى اجتماع جديد ${values.title}`,
              createdAt: new Date(),
            }
        );
      } )
      if (response) {
        aleartsToast("success", "تم انشاء الاجتماع بنجاح ");
      }
    } catch (error) {
      aleartsToast("error", error.response.data.message);
    }
  };
};

export default CreateMeetingChatAction;
