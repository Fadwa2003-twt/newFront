import React, {useState} from "react";
import "./DefaultSelect.css";

function DefaultSelect(props) {
  const {
    name,
    value,  // This should be the _id of the selected option
    onChange,
    error,
    isTitle = true,
    title,
    options = [],
    className,
    classNameSelect,
    optionSelecte,  // This is the selected option object
      color
  } = props;

  return (
      <div
          className={`items-center ${className ? className : "rounded-[8px]"}`}
          style={{
            position: "relative",
            background: "#a6cdd766",
          }}
      >
        <select
            className={`select-default input-font-size  px-4 w-full text-default-opacity ${
                error ? "select-error" : ""
            } ${classNameSelect ? classNameSelect : "select-arrow-left py-2"}`}
            name={name}
            value={value}  // This should be the _id of the selected option
            onChange={onChange}

        >
          {isTitle && (
              <option value="" selected disabled>
                {title}
              </option>
          )}
          {options.map((option) => (
              <option
                  key={option._id}
                  value={option._id}  // The value is the _id of the option
                  className={"option-default " + (!color ? `bg-[#a6cdd766]` : "")}
                  // style={color ? {backgroundColor:option.color} : {}}
              >
                {color ? (
                    <div className={"w-full p-3"} style={{backgroundColor:option.color}}>
                        {option.name}
                    </div>
                    ) :
                    option.name
                }
              </option>
          ))}
        </select>
        {error && (
            <p
                className="error-message"
                style={{
                  fontSize: "12px",
                  marginTop: "-5px",
                }}
            >
              {error}
            </p>
        )}
      </div>
  );
}

export default DefaultSelect;
