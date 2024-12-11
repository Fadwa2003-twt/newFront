import React from 'react';
import NotificationCardHeader from "../Notifications/NotificationCardHeader";
import MessageCardHeader from "./MessageCardHeader";
import user4Icon from "../../../assets/icons/users/user4.png"
import user5Icon from "../../../assets/icons/users/user5.png"
import user6Icon from "../../../assets/icons/users/user6.png"
function MessagesHeader({isOpen}) {
    const messages = [
        {
            id: 1, name: "علي خالد",
            image:user5Icon ,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
        },
        {
            id: 2, name: "محمد الشرفا",
            image: user6Icon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
        },
        {
            id: 3, name: "اكرم خالد",
            image: user4Icon,
            description:"نشر محترف للبيانات ومعرفه تفاصيل المهمه",
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
                        الرسائل
                    </div>
                    <div className="flex flex-col gap-2 px-1 pb-7">
                        {messages.map((element,index) => (
                            <MessageCardHeader
                                key={index}
                                id={index}
                                name={element.name}
                                image={element.image}
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


export default MessagesHeader;