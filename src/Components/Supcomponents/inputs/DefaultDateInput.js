import React, { useRef } from "react";

function DefaultDateInput(props) {
  const inputClick = useRef(null);

  const handelClickLabel = () => {
    inputClick.current.showPicker();
  };
  return (
    <div className={"flex items-center text-gray-400 " + props.className}>
      <label
        className={"btn-primary input-font-size px-4 w-full flex bg-primary-btn items-center " +props.classNameLabel}
        htmlFor={props.id}
        onClick={handelClickLabel}
      >
          {props.iconClass ? <i className={props.iconClass}></i>: ""}
        {props.value ? props.value :props.title}
      </label>
      <input
        ref={inputClick}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className={"opacity-0 w-0 absolute"}
        type={"date"}
      />
    </div>
  );
}

export default DefaultDateInput;
