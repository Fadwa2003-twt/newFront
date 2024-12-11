import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Paper,
    Grid,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import NewNotificationForm from "../components/Notifications/NewNotificationForm";
import NotificationList from "../components/Notifications/NotificationList";

const NotificationComponent = () => {
    const [selectedNotification, setSelectedNotification] = useState(null);

    const notifications = [
        { id: 1, name: "محمد علي", avatar: "/path/to/avatar1.jpg" },
        { id: 2, name: "أحمد خالد", avatar: "/path/to/avatar2.jpg" },
        { id: 3, name: "فاطمة عمر", avatar: "/path/to/avatar3.jpg" },
    ];

    const handleNotificationClick = (notification) => {
        setSelectedNotification(notification);
    };

    return (
        <Grid container spacing={3} p={6}>
            {/* Left Side (Notifications List) */}
            <NotificationList />

            {/* Right Side (Notification Details) */}
            <NewNotificationForm  />
        </Grid>
    );
};

export default NotificationComponent;
