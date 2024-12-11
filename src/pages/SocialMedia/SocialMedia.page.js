import React from 'react';
import TweeterSocial from "./components/Taps/Tweeter.social";
import TapsComponent from "../../Components/Taps.component";
import InstaSocial from "./components/Taps/Insta.social";

function SocialMediaPage(props) {
    return (
        <TapsComponent
            firstTapTitle={"تويتر"}
            secondTapTitle={"انستجرام"}
            thirdTapTitle={"فيسبوك"}
            FourthTapTitle={"جيميل"}
            FifthTapTitle={"يوتيوب"}
            firstTapComponent={<TweeterSocial key={"tweeter"} type={props.type} />}
            SecondTapComponent={<InstaSocial key={"insta"} type={props.type} />}
            ThirdTapComponent={<div></div>}
            FourthTapComponent={<div></div>}
        />
    );
}

export default SocialMediaPage;