import React from 'react';

function EditIconBtn(props) {
    return (
        <div className={"flex justify-center items-center"}>
            <i className={"fa-regular fa-pen-to-square " + props.className}></i>
        </div>
    );
}

export default EditIconBtn;