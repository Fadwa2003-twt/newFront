import React from 'react';
import HeaderComponent from "./Header/Header.component";
import AppRoute from "../Routes/app.route";
import MenuComponent from "./Menu.component";

function MainComponent(props) {
    return (
        <div className="w-full flex flex-row min-h-screen">
            <MenuComponent/>
            <div className="main flex w-full flex-col min-h-screen">
                <HeaderComponent/>
                {props.children}
            </div>
        </div>
    );
}

export default MainComponent;