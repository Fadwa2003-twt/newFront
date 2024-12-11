import React from "react";

function DefaultFileInput(props) {
    return (
        <div className={"default-file-input " + props.className}>
            <label
                className={"py-2 px-4 pr-5 rounded-[11px] input-font-size w-full flex items-center bg-primary-btn"}
                htmlFor={props.name}
                style={{
                    fontFamily: "Katibeh",
                    fontWeight: 100,
                    textAlign: "right",
                    color: "#42414180",
                }}
            >
                {
                    props.titleBoxPrimary?
                    <div className={"bg-primary ml-2 px-2 text-white rounded-[5px] "}>{props.titleBoxPrimary}</div>
                        :null
                }
                {props.value ? props.value.name ? props.value.name :props.value:props.title}
            </label>
            <input
                id={props.name}
                accept={props.accept}
                name={props.name}
                onChange={props.onChange}
                className={"opacity-0 absolute w-0"}
                type={"file"}
            />
        </div>
    );
}

export default DefaultFileInput;
