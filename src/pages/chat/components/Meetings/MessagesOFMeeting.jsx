import React from 'react';
import DefaultModal from "../../../../modals/DefaultModal";
import EditIconBtn from "../../../../Components/Supcomponents/Buttons/EditIconBtn";
import DeleteIconBtn from "../../../../Components/Supcomponents/Buttons/DeleteIconBtn";
import { Box, IconButton, Paper, Typography, Avatar } from "@mui/material";
import Message from "../Chats/Message";
import MessageInput from "../Chats/MessageInput";

function MessagesOfMeeting(props) {
    return (
        <DefaultModal
            classNameModal={"w-full md:w-[40%] border-2 border-[#498696] rounded-2xl pt-4 "}
            isModalOpen={props.isModalOpen}
            onClose={props.onClose}
            isTitle={false}
        >
            <div className={"w-full flex flex-col gap-4 justify-center"}>
                <div className={"headerChat px-5 flex flex-col gap-3"}>
                    <div className={"w-full flex justify-between"}>
                        <p className={"text-primary"}>محادثات اجتماع 5 : نشر المحتوى </p>
                        <div className={""}>
                            20/8/2024
                        </div>
                    </div>
                    <div className={"w-full flex justify-between"}>
                        <div className={"avatars flex gap-2 "}>
                            <img
                                alt={"img"}
                                src={"https://s3-alpha-sig.figma.com/img/13d6/b0c9/82c7d2fc62c1c24febf90f8c169e4a2a?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M1tFSPJ1h2KgaRMyOPl40CeTlT6Fisl0mRp7Ih1PIBdcBJii3ITJEABI6d3umfp0Vknwrep37oY32ZX1OqZ5y9qHlBbEe45q-uvAooVLyXGoNhlObjtyxg1mEKSSC2r7yHRZ48Eon1Ccl~Vj0H4gHxik~0LtvL6QMTGKjxzgRuaA56~8EM2vSUn2xMGmqc~lQfDEu36n2nqJESGeRHFYGE6u4L54zR~kE~SJp7U5SHVLTIEX25qPgsm7pVgDG9QIFCT3uMCtjHjXsl6ZXW5S81B8h78B0TTA7~tYJBGt8uzdfesW05ibx-MiT6j9n~JhvbZjEj4TgVzyQddOwer-3Q__"}
                                className={"w-[30px] h-[30px] rounded-full"}
                            />
                            <img
                                alt={"img"}
                                src={"https://s3-alpha-sig.figma.com/img/13d6/b0c9/82c7d2fc62c1c24febf90f8c169e4a2a?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M1tFSPJ1h2KgaRMyOPl40CeTlT6Fisl0mRp7Ih1PIBdcBJii3ITJEABI6d3umfp0Vknwrep37oY32ZX1OqZ5y9qHlBbEe45q-uvAooVLyXGoNhlObjtyxg1mEKSSC2r7yHRZ48Eon1Ccl~Vj0H4gHxik~0LtvL6QMTGKjxzgRuaA56~8EM2vSUn2xMGmqc~lQfDEu36n2nqJESGeRHFYGE6u4L54zR~kE~SJp7U5SHVLTIEX25qPgsm7pVgDG9QIFCT3uMCtjHjXsl6ZXW5S81B8h78B0TTA7~tYJBGt8uzdfesW05ibx-MiT6j9n~JhvbZjEj4TgVzyQddOwer-3Q__"}
                                className={"w-[30px] h-[30px] rounded-full"}
                            />
                            <img
                                alt={"img"}
                                src={"https://s3-alpha-sig.figma.com/img/13d6/b0c9/82c7d2fc62c1c24febf90f8c169e4a2a?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M1tFSPJ1h2KgaRMyOPl40CeTlT6Fisl0mRp7Ih1PIBdcBJii3ITJEABI6d3umfp0Vknwrep37oY32ZX1OqZ5y9qHlBbEe45q-uvAooVLyXGoNhlObjtyxg1mEKSSC2r7yHRZ48Eon1Ccl~Vj0H4gHxik~0LtvL6QMTGKjxzgRuaA56~8EM2vSUn2xMGmqc~lQfDEu36n2nqJESGeRHFYGE6u4L54zR~kE~SJp7U5SHVLTIEX25qPgsm7pVgDG9QIFCT3uMCtjHjXsl6ZXW5S81B8h78B0TTA7~tYJBGt8uzdfesW05ibx-MiT6j9n~JhvbZjEj4TgVzyQddOwer-3Q__"}
                                className={"w-[30px] h-[30px] rounded-full"}
                            />
                            <img
                                alt={"img"}
                                src={"https://s3-alpha-sig.figma.com/img/13d6/b0c9/82c7d2fc62c1c24febf90f8c169e4a2a?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M1tFSPJ1h2KgaRMyOPl40CeTlT6Fisl0mRp7Ih1PIBdcBJii3ITJEABI6d3umfp0Vknwrep37oY32ZX1OqZ5y9qHlBbEe45q-uvAooVLyXGoNhlObjtyxg1mEKSSC2r7yHRZ48Eon1Ccl~Vj0H4gHxik~0LtvL6QMTGKjxzgRuaA56~8EM2vSUn2xMGmqc~lQfDEu36n2nqJESGeRHFYGE6u4L54zR~kE~SJp7U5SHVLTIEX25qPgsm7pVgDG9QIFCT3uMCtjHjXsl6ZXW5S81B8h78B0TTA7~tYJBGt8uzdfesW05ibx-MiT6j9n~JhvbZjEj4TgVzyQddOwer-3Q__"}
                                className={"w-[30px] h-[30px] rounded-full"}
                            />
                        </div>
                        <div className={"icons flex gap-3"}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1, // Space between icons
                                }}
                            >
                                <IconButton sx={{p: 0}}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/a488/ad7f/4034acfaced63e76b8c7dba2734694dd?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DXPm7WW2BzKXO9PT7Eg9j~GsKS4O5qsjcw5PneHD3l9OLjINRvPSn2bQgPYByzehV79gPReztebrNHn6NWaF0wSES9viKs5-1VAyz3GpQFbd4pWU-wlXdOqFoMWRJbVQlj1weS4IErWltI1rt-UgkAu5qKhjFiCWxJFhNJCnSKqRFOpUmrNR8HM5nGvTKF94qAB14b1rhlAmy-gewgc5OPApk6qhqwfQ~6xQcnsGQ5xAaU4Ve9gBD6~TnZQYwpG98rAX4g0KWBEaaw91a-IMWc2Y9mAstvdBs1lP~JRCxmZrdtKZqQfO0MIbeormh77KTYPLwFlKZ4L5E2w7wividA__"
                                        alt="icon1"
                                        style={{width: 25, height: 25}} // Set image size
                                    />
                                </IconButton>
                                <IconButton sx={{p: 0}}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/f963/a113/e6e518dc8ac3d8bb6def90e77dff8a5b?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lsrwBIZKu5~CamEL3BatZfKoB~~ckxdBPNULibTTIFoJIWaKRybQeFly2pjW6WAA~rM6n~1y1DmRiZ~QTOpH7P4-Y9TGr-g7Tf16dIk0t8-InpLk7puGUv-9~rzu33sllo1kxZ8feYlAXOf5vBq7cPVZo9Pi9pUzD8sjAf8qnhGX0Cfgf8WtK5l5MqHC4xm8eVfZEQ6JXT2YYEDXS385Mqh-O7wBTBSkjSK9mphxHEnOGNk5vssq6RQV7ZV~9CsaWqwV~odKhp3jOMaVH3ZXAiphPPWx23rPiPVy6iAB-jmPn71o4Il2ChzsE0ar~pCjClYnQQDjh1BCXYIYRE7yLg__"
                                        alt="icon2"
                                        style={{width: 25, height: 25}} // Set image size
                                    />
                                </IconButton>
                                <IconButton sx={{p: 0}}>
                                    <img
                                        src="https://s3-alpha-sig.figma.com/img/85f6/8a2e/3e6c74789a2c203fe8340f35c352012c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oKZ1H7vffScGcgWVpWxL-anHgWiYDO7Ut5PzYeDmmib4tuVUitjEEzYa1uNQTQZ0~xSSNImEUnd1L0L9EcAuVMGvn0~FUQDkfogUGe6JgcvRzulEgUFdcKJuTE0ENKpbnxup9XHVTT8rRQgzKyNTcYV1GJRg~7dvXjuzYs4moXbYE4zlNSHGvZ~YLtSa1pyMrpQr8BMqMqdWjkILljTu5swwJYLB0wL0zpSaZfakOo0ZnBUjEX8ZvjheSNg-RWcTMGgAUJgDnTE6ie90UamK8dNxWewxaM~RcFfyAvw2E~WazCujhPbXmpMJa1bPMAwNf6HB8EVjiAP0FEYT0KkPbg__"
                                        alt="icon3"
                                        style={{width: 25, height: 25}} // Set image size
                                    />
                                </IconButton>
                            </Box>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col gap-3 px-10 py-4"}>
                    <div className={"flex items-center justify-between"}>

                    </div>
                    <div className={"overflow-y-auto text-[20px] font-medium max-h-[60vh] h-[40vh]"}>
                        {" "}
                        {/* Add horizontal padding here */}
                        <Message text="اجتماع اليوم مهم... انتبهوا" isUser={true}/>
                        <Message text="تمام يا بشمهندس ... الساعه كم؟" isUser={false}/>
                        <Message text="اهناقش فيه اساليب لنشر المحتوى" isUser={true}/>
                        <Message text="الساعه التاسعة صباحا..." isUser={true}/>
                        <Message text="تمام هتواصل معه وأوافقهم" isUser={false}/>
                        <Message text="في شويه تعديلات ابغيه" isUser={true}/>
                        <Message text="ارسلها لي وهعدلهم بإذن الله" isUser={true}/>
                    </div>
                    <div className={"p-2"}>
                        <MessageInput/>
                    </div>
                </div>
            </div>
        </DefaultModal>
    );
}

export default MessagesOfMeeting;