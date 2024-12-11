import axios from "axios";
import { aleartsToast } from "../../../alearts/alearts";
import { rootRoute } from "../../../Routes/Root.route";
import { New_Message } from "../../Types";
import socket from "../../../socket";

const CreateMessageAction = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const user_id = user.data._id;

    const formData = new FormData();
    formData.append("chat_id", values.chat.chat_id);
    formData.append("sender_id", user_id);
    formData.append("message", values.message);
    values.files.forEach((file) => {
        formData.append("images", file);
    });

    return async (dispatch) => {
        if (!values.chat) {
            aleartsToast("error", "لا يوجد محادثة مختاره");
            return;
        }

        if (!values.message) {
            aleartsToast("error", "محتوي الرسالة مطلوب!!!");
            return;
        }

        const newMessage = {
            chat_id: values.chat.chat_id,
            sender_id: user_id,
            message: values.message,
            type: '0',
            createdAt: new Date(),
        };

        dispatch({
            type: New_Message,
            payload: newMessage,
        });

        try {
            const response = await axios.post(
                `${rootRoute}/api/v1/conversations/message`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(values)

            const serverMessage = response.data.data;
            socket.emit("newMessage", {
                chat_id: values.chat.chat_id,
                sender_id: user_id,
                message: values.message,
                type: serverMessage.type,
                createdAt: new Date(),
            });

            if (response.data.files) {
                response.data.files.forEach((file) => {
                    socket.emit("newMessage", {
                        chat_id: values.chat.chat_id,
                        sender_id: user_id,
                        message: file.filename,
                        type: file.type,
                        createdAt: new Date(),
                    });
                });
            }
        } catch (error) {
            aleartsToast("error", error.response.data.message || error.message);
        }
    };
};

export default CreateMessageAction;
