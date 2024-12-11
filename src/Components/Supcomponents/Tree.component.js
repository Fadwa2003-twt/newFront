import React, { useEffect, useState } from 'react';
import fileIcon from "../../assets/icons/file.png"

function TreeComponent({
                           data,
                           dataClick,
                           title,
                           classNameContener,
                           className,
                           isFileIcon,
                           isCounter,
                           selectedRows,
    onCheck,
                           isBorder = true
                       }) {
    // const arr = [
    //     { name: 'ناشر', _id: 1 },
    //     { name: 'ناشر كاتب محتوى', _id: 2 },
    //     { name: 'ناشر محترف', _id: 3 },
    //     { name: 'ناشر محترف رافع', _id: 4 },
    //     { name: 'test department', _id: 5 },
    //     { name: 'test', _id: 6 },
    //     { name: 'test team', _id: 7 },
    // ];

    const arr = [];

    const [initialData, setInitialData] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setInitialData(data);
        } else if (Array.isArray(dataClick) && dataClick.length > 0) {
            setInitialData(dataClick);
            console.log(dataClick[0]?._id?.toString())
        } else {
            setInitialData(arr);
        }
    }, [data, dataClick]);// Add dependencies here to avoid infinite loop


    const handelActiveItem = (event, handelOnClick = () => {}) => {
        const id = event.currentTarget.id; // Get the id of the clicked item
        setActiveItem(id); // Set the active item
        console.log(id);
        handelOnClick();
    };

    useEffect(() => {
        if (Array.isArray(dataClick) && dataClick.length > 0) {
            setActiveItem(dataClick[0]?._id?.toString())
        }
    }, []);

    useEffect(() => {
        if (selectedRows && selectedRows.length === 0) {
            setSelectedKeys([]); // Clear all selected keys when selectedRows is cleared
        }
    }, [selectedRows]);

    const handleCheckboxChange = (id) => {
        setSelectedKeys((prevKeys) => {
            const newKeys = prevKeys.includes(id)
                ? prevKeys.filter((key) => key !== id)
                : [...prevKeys, id];

            if (onCheck) {
                onCheck(newKeys); // Notify parent of the selected departments
            }

            return newKeys;
        });
    }


    return (
        <div className={`flex flex-col border-gray-500  ${isBorder ? "md:border-l-2 " : " "}` + (classNameContener ? classNameContener : "gap-10")}>
            <h3 className={"text-title"}>{title}</h3>
            <div className={"flex flex-col"}>
                <div className={"flex flex-col tapsArea overflow-y-auto max-h-[50vh] bg-default-input p-5 rounded-[12px] " + className}>
                    {initialData?.map((element, index) => (
                        <div
                            key={index} // Assign key to each item in the list
                            id={element._id}
                            onClick={(event) => handelActiveItem(event, element?.onClick)}
                            className={"flex items-center gap-2 p-1 " + (dataClick ? activeItem === element?._id.toString() ? 'cursor-pointer bg-primary text-white rounded-lg' : "cursor-pointer" : "")}>
                            {!dataClick ? <input type={"checkbox"}   checked={selectedKeys.includes(element._id)}
                                                 onChange={() => handleCheckboxChange(element._id)} /> : ""}
                            <div className={"flex gap-1 items-center"}>
                                {isFileIcon ? <img alt={"img"} className={"icon-item-event"} src={fileIcon} /> : ""}
                                <div className={"flex gap-1 items-center"}>
                                    {isCounter ? <p className={"text-md"}>{element.counter}</p> : ""}
                                    <p className={"text-md"}>{element.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TreeComponent;
