import React from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { useFormikContext } from "formik";

const SelectMUI = (props) => {
  //   states
  const { name, options, label, onChange, empImg } = props;
  const { setFieldValue, errors, touched } = useFormikContext();

  // functions

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={"text-start col-xl-" + 12}>
      <label htmlFor="input-rounded" className="form-label">
        {label}
      </label>
      <FormControl
        fullWidth
        size="small"
        error={!!errors[props.name]}
        variant="outlined"
        onChange={handleChange}
      >
        {options.length > 0 ? (
          <>
            <Select displayEmpty name={props.name} onChange={handleChange}>
              <MenuItem selected>{label}</MenuItem>
              {options.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  <>
                    {option.name}
                    {empImg && (
                      <img
                        style={{
                          width: 24,
                          height: 24,
                          marginRight: 16,
                        }}
                        src={
                          typeof empImg !== String
                            ? "https://www.w3schools.com/howto/img_avatar.png"
                            : empImg
                        }
                        alt={option.name}
                      />
                    )}
                  </>
                </MenuItem>
              ))}
            </Select>
            {errors[props.name] && touched[props.name] && (
              <span className="text-danger">{errors[props.name]}</span>
            )}
          </>
        ) : (
          <>
            <Select displayEmpty name={props.name} onChange={handleChange}>
              <MenuItem selected>
                ل{label} يجب التحديد من الخانات السابقة
              </MenuItem>
            </Select>
            {errors[props.name] && touched[props.name] && (
              <span className="text-danger">{errors[props.name]}</span>
            )}
          </>
        )}
      </FormControl>
    </div>
  );
};

export default SelectMUI;
