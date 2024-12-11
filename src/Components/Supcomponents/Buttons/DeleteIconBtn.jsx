import React from 'react';

function DeleteIconBtn(props) {
    return (
        <div className={"flex justify-center items-center"}>
            <i className={"fa-regular fa-trash-can " + props.className}></i>
        </div>
    );
}

export default DeleteIconBtn;