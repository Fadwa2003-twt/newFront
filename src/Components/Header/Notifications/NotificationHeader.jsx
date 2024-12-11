import React from 'react';
import NotificationCardHeader from "./NotificationCardHeader";
import dangerIcon from "../../../assets/icons/alerts/warning.png"
import warningIcon from "../../../assets/icons/alerts/alert.png"
import reminderIcon from "../../../assets/icons/alerts/reminder.png"

function NotificationHeader({ isOpen }) {
    const notifications = [
        {
            id: 1, title: "إشعار جديد",
            imgSrcAlert: dangerIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
        {
            id: 2, title: "إشعار جديد",
            imgSrcAlert: warningIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
        {
            id: 3, title: "إشعار جديد",
            imgSrcAlert: reminderIcon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
            status:"تحذير",
        },
    ];
    return (
        <>
            {isOpen && (
                <div
                    id="dropdownNotification"
                    className="z-20 w-80 max-w-sm bg-white border border-[#498696] divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700 absolute"
                >
                    <div className="block px-4 py-2 text-start text-lg text-primary rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                        الاشعارات
                    </div>
                    <div className="flex flex-col gap-2 px-1 pb-7">
                        {notifications.map((element,index) => (
                            <NotificationCardHeader
                                key={index}
                                notificationId={index}
                                title={element.title}
                                imgSrcAlert={element.imgSrcAlert}
                                description={element.description}
                                date={""}
                            />
                        ))}
                        {/* Repeat similar blocks for other notifications */}
                    </div>
                </div>
            )}
        </>
    );
}

export default NotificationHeader;
