import React from 'react';

function PointColorComponent(props) {
    return (
        <div className={"flex items-baseline gap-1"}>
            <div className={"rounded-full h-2 " + (props.classNameCyrcle ? props.classNameCyrcle : "bg-primary") } style={{padding: "4px"}}></div>
            <p className={props.classNameDescription}>{props.description}</p>
        </div>
    );
}

export default PointColorComponent;