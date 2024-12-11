import React, { useState } from "react";
import TapsComponent from "../../Components/Taps.component";
import Notifications from "./taps/Notifications";
import FirstTapComponent from "./taps/FirstTapComponent";
import MeetingsChats from "./taps/Meetings.chats";

const Chat = () => {
  return (
    <TapsComponent
      firstTapTitle={"المحادثات"}
      secondTapTitle={"الاجتماعات"}
      thirdTapTitle={"الاشعارات"}
      firstTapComponent={<FirstTapComponent />}
      SecondTapComponent={<MeetingsChats/>}
      ThirdTapComponent={<Notifications />}
    />
  );
};

export default Chat;
