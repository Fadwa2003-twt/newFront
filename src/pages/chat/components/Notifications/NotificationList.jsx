import React, {useState} from "react";
import NotificationCard from "./NotificationCard";
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

import DangerIcon from "../../../../assets/icons/alerts/warning.png"
import WarningIcon from "../../../../assets/icons/alerts/alert.png"
import ReminderIcon from "../../../../assets/icons/alerts/reminder.png"
import CreateNotification from "../../../../assets/icons/Notifications/create-notification.png"

const NotificationList = ({onNotificationClick}) => {
    const [selectedNotification, setSelectedNotification] = useState(null);

    const notifications = [
        {
            id: 1, title: "إشعار جديد",
            imgSrcAlert: DangerIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
        {
            id: 2, title: "إشعار جديد",
            imgSrcAlert: WarningIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
        {
            id: 3, title: "إشعار جديد",
            imgSrcAlert:ReminderIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
    ];
    return (
        <Grid item xs={12} md={4} sx={{ borderLeft: 2, borderColor: "rgba(93,92,92,0.29)" }}>
            <Box mb={3}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6">اشعار الموظفين</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton>
                        <img
                            className={"icon-item-event"}
                            src={CreateNotification}
                            alt={"img"}
                        />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                    padding: "0 8px",
                    height: 40,
                }}
            >
                <IconButton sx={{ p: 0, mr: 1 }}>
                    {/* Replace with actual search icon */}
                    {/* <img src="path_to_search_icon" alt="Search icon" style={{ width: 25, height: 25 }} /> */}
                </IconButton>
                <Box
                    sx={{
                        height: 20,
                        width: "1%",
                        backgroundColor: "#ccc",
                        mx: 1,
                    }}
                />
                <TextField
                    fullWidth
                    placeholder="البحث"
                    variant="outlined"
                    InputProps={{
                        disableUnderline: true,
                        sx: { border: "none", outline: "none", padding: 0 },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "none",
                            },
                        },
                    }}
                />
            </Box>

            <List>
                {notifications.map((element,index) => (
                    <NotificationCard
                        key={index}
                        notificationId={index}
                        title={element.title}
                        imgSrcAlert={element.imgSrcAlert}
                        description={element.description}
                        status={element.status}
                    />
                ))}
            </List>
        </Grid>
    );
}

export default NotificationList;
