"use client";

import React from "react";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

const Input = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  placeholder,
  error,
  classNames,
  iconPosition = "left",
  icon,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <IconField iconPosition={iconPosition}>
        <InputIcon className={`pi pi-${icon}`} />
        <InputText
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full  ${classNames ?? ""} ${
            error ? "p-invalid" : ""
          }`}
          autoComplete="off"
        />
      </IconField>
        {/* {error && <small className="text-red-500 mt-1">{error}</small>} */}
    </div>
  );
};

export default Input;
