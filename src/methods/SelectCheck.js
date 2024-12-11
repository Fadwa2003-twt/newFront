// components/SelectCheck.js
import { useEffect, useState } from "react";

const SelectCheck = ({ allItems, selectedItems, setSelectedItems }) => {
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        // تحقق مما إذا كانت جميع العناصر محددة
        if (allItems.length > 0 && allItems.length === selectedItems.length) {
            setSelectAllChecked(true);
        } else {
            setSelectAllChecked(false);
        }
    }, [selectedItems, allItems]);

    // دالة لتحديد الكل أو الغاء التحديد
    const toggleSelectAll = () => {
        if (selectAllChecked) {
            // إذا كانت جميع العناصر محددة، قم بإلغاء تحديد الجميع
            setSelectedItems([]);
        } else {
            // قم بتحديد جميع العناصر
            const allItemIds = allItems.map((item) => item._id);
            setSelectedItems(allItemIds);
        }
    };

    // دالة لتحديد أو إلغاء تحديد عنصر واحد
    const toggleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            // إذا كان العنصر محددًا، قم بإزالته من القائمة
            setSelectedItems(selectedItems.filter((id) => id !== itemId));
        } else {
            // إذا لم يكن محددًا، قم بإضافته إلى القائمة
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    return {
        selectAllChecked,
        toggleSelectAll,
        isItemSelected: (itemId) => selectedItems.includes(itemId),
        toggleSelectItem,
    };
};

export default SelectCheck;
