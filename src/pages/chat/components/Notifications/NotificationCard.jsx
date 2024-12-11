import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";

function NotificationCard(props) {
    const [selectedNotification, setSelectedNotification] = useState(null);

    const handleNotificationClick = (notification) => {
        console.log(props.title)
        setSelectedNotification(notification);
    };

    return (
        <Box
            sx={{
                bgcolor: "#49869633",
                p: 2,
                mb: 2,
                borderRadius: 2,
                cursor: "pointer",
            }}
            onClick={() => handleNotificationClick({ id: props.notificationId })}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <img alt={"img"} className={"w-[15px] h-[15px]"} src={props.imgSrcAlert} />
                    <Typography variant="subtitle1">
                        {props.title}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="subtitle2" color="white"
                                sx={{ backgroundColor: '#49869699', padding: '0px 8px 0px 8px', borderRadius: '6px' }}>
                        {props.status}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="caption">
                {props.description}
            </Typography>
        </Box>
    );
}

export default NotificationCard;