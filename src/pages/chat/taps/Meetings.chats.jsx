import React, { useState } from 'react';
import { Grid, Box } from "@mui/material";
import MeetingsList from "../components/Meetings/MeetingsList";
import MeetingMenu from "../components/Meetings/MeetingMenu";

function MeetingsChats(props) {
    const [dataMeeting, setDataMetting] = useState({ "title": "", "date": "" });

    const changeData = (value) => {
        setDataMetting(value);
    };

    return (
        <Box sx={{ width: '100%', height: '90%', p: '38px 2.5rem', boxSizing: 'border-box' }}>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={4}>
                    <MeetingsList changeData={changeData} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <MeetingMenu data={dataMeeting} team={""} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default MeetingsChats;
