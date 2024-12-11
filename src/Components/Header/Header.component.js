import React, { useState, useEffect, useRef } from 'react';
import profileIcon from "../../assets/icons/profile.png";
import NotificationHeader from "./Notifications/NotificationHeader";
import NotificationButton from "./Notifications/NotificationButton";
import MessageBtn from "./Message/MessageBtn";
import MessagesHeader from "./Message/MessagesHeader";
import socket from "../../socket";
import {useDispatch, useSelector} from "react-redux";
import AddMessageAction from "../../redux/action/Conversation/AddMessage.action";
import CreateNotificationAction from "../../redux/action/Notification/NewNotificationaction";
import {Avatar} from "@mui/material";

function HeaderComponent(props) {
    const [isOpenNotification, setIsOpenNotification] = useState(false);
    const [isOpenMessage, setIsOpenMessage] = useState(false);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const dropdownNotificationRef = useRef(null);
    const dropdownMessageRef = useRef(null);
    const dropdownProfile = useRef(null);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

    const toggleDropdownNotification = () => {
        setIsOpenNotification(!isOpenNotification);
    };

    const toggleDropdownMessages = () => {
        setIsOpenMessage(!isOpenMessage);
    };

    const toggleDropdownProfile = () => {
        setIsOpenProfile(!isOpenProfile);
    };


    const handleClickOutside = (event) => {
        if (dropdownNotificationRef.current && !dropdownNotificationRef.current.contains(event.target)) {
            setIsOpenNotification(false);
        }
        if (dropdownMessageRef.current && !dropdownMessageRef.current.contains(event.target)) {
            setIsOpenMessage(false);
        }
    };

    useEffect(() => {
        socket.emit("auth", {
            user_id: user._id,
        });

        socket.on("getMessages", (data) => {
            dispatch(AddMessageAction(data));
        });

        socket.on("getNotification", (notification) => {
            dispatch(CreateNotificationAction(notification.data));
        });

        return () => {
            socket.off("getMessages");
            socket.off("getNotification");
        };

    }, []);


    useEffect(() => {
        if (isOpenNotification || isOpenMessage) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpenNotification, isOpenMessage]);

    const handelSignout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <>
            <div className="header p-10 mx-auto my-6 flex flex-row-reverse w-10/12 justify-between items-center h-10">
                <div className={"flex justify-center gap-4"}>
                    <div className="relative" ref={dropdownProfile}>
                        <div className={"flex flex-row-reverse gap-3 cursor-pointer"} onClick={toggleDropdownProfile}>
                            <Avatar size="sm" alt={"user"} img={profileIcon} rounded/>
                            <div className={"text-profile "}>
                                <h6>{user.name}</h6>
                                <h6>{user.role}</h6>
                            </div>
                        </div>
                        {
                            isOpenProfile && (
                                <div
                                    id="dropdownProfile"
                                    className="z-20 w-25 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute"
                                >
                                    <div className="flex flex-col gap-2 p-3 justify-center">
                                        <div className={"text-red-500 text-sm font-medium cursor-pointer"} onClick={handelSignout}>تسجيل
                                            الخروج
                                        </div>
                                        {/* Repeat similar blocks for other notifications */}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={"events flex gap-3 relative"}>
                    <div className="relative" ref={dropdownNotificationRef}>
                        <NotificationButton onClick={toggleDropdownNotification}/>
                        <NotificationHeader isOpen={isOpenNotification}/>
                    </div>
                    <div className="relative" ref={dropdownMessageRef}>
                        <MessageBtn onClick={toggleDropdownMessages}/>
                        <MessagesHeader isOpen={isOpenMessage}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeaderComponent;
