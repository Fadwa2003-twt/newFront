import React from 'react';
import TapsComponent from "../../Components/Taps.component";
import AccountsCategoriesTap from "./components/Taps/AccountsCategories.tap";
import ContentsCategoriesTap from "./components/Taps/ContentsCategories.tap";

function CategoriesPage(props) {
    return (
        <TapsComponent
            firstTapTitle={"تصنيفات الحسابات"}
            secondTapTitle={"تصنيفات المحتوى"}
            firstTapComponent={<AccountsCategoriesTap />}
            SecondTapComponent={<ContentsCategoriesTap />}
        />
    );
}

export default CategoriesPage;