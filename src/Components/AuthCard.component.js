import React from 'react';
import profileIcon from "../assets/images/user-logo.png";

function AuthCardComponent(props) {
    return (
        <div className={"w-full flex justify-center items-center min-h-screen h-full bg-auth"}>
            <div className={"relative w-5/12 py-20 flex flex-col items-center"}>
                <div className={"max-w-36 absolute top-0"}>
                    <img className="max-w-full" src={profileIcon} alt="logo"/>
                </div>
                <div className={"bg-auth-form px-6 rounded-3xl pt-16 pb-7 w-full"}>
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default AuthCardComponent;