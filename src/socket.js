import io from "socket.io-client";
import { rootRoute } from "./Routes/Root.route";

const socket = io(rootRoute); // Replace with your server URL

socket.on("getUsers", (users) => {});

export default socket;
