import React from 'react';
import PointColorComponent from "../../../../Components/PointColor.component";
import {
    Box,
    Typography,
    TextField,
    Paper,
    Grid,
    Avatar,
    Autocomplete
} from "@mui/material";
import TextInput from "../../../../Components/Supcomponents/inputs/TextInput";
import DefaultSelect from "../../../../Components/Supcomponents/inputs/DefaultSelect";
import InputWithIcon from "../../../../Components/Supcomponents/inputs/InputWithIcon";
import DefaultBtn from "../../../../Components/Supcomponents/Buttons/DefaultBtn";
import SelecteAutoComplete from "../../../../Components/Supcomponents/inputs/SelecteAutoComplete";
import DangerIcon from "../../../../assets/icons/alerts/warning.png"
import WarningIcon from "../../../../assets/icons/alerts/alert.png"
import ReminderIcon from "../../../../assets/icons/alerts/reminder.png"
import CreateNotification from "../../../../assets/icons/Notifications/create-notification.png"
function NewNotificationForm(props) {
    const typesNotification = [
        {
        name:"تحذير",
        aleartImg:DangerIcon
    },
        {
            name:"تنبيه",
            aleartImg:WarningIcon
        },
        {
            name:"تذكير",
            aleartImg:ReminderIcon
        },
    ]
    return (
        <Grid item xs={12} md={7} container justifyContent="center">
            <Paper sx={{ borderColor: "#498696", borderWidth: 1, borderRadius: 2,height:'20rem', p: 4, width: "80%" }}>
                <div className={"flex flex-col gap-4"}>
                        <p className={"text-lg mb-5"}>اضافة اشعار/ تبيه جديد</p>
                    <div className={"flex justify-between"}>
                        <TextInput className={"w-[47%]"} title={"اسم الموظف"} />
                        <SelecteAutoComplete
                            title={"نوع الإشعار"}
                            options={typesNotification}
                            className=" w-[47%]"
                            classNameInput={"py-1 px-4"}
                            classNameSelect={"select-arrow-left"}
                        />
                    </div>
                    <InputWithIcon classNmae={"w-full"} classNameLabel={"rounded-[11px]"} title={"محتوى الإشعار"}
                                   imgSrc={CreateNotification}
                        />
                        <div className={"btnsNewNotification flex w-full gap-3 mt-4 flex-row-reverse"}>
                            <DefaultBtn title={"حفظ"} classBtn={"w-20 rounded-[6px] bg-[#49869680]"}  />
                            <DefaultBtn title={"إلغاء"} classBtn={"w-20  rounded-[6px] bg-primary-btn"}  />
                        </div>
                </div>
            </Paper>
        </Grid>
    );
}

export default NewNotificationForm;