"use client";

import { HTMLInputTypeAttribute } from "react";
import { useController, Control } from "react-hook-form";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  validations?: { message: string; check: (value: string) => boolean }[];
};

function MainInput({
  name,
  control,
  label,
  isRequired,
  placeholder,
  type = "text",
  validations,
}: Props) {
  const {
    field: { value, onChange, ref },
    fieldState: { error, isDirty, invalid },
  } = useController({ name, control });

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={name} className="text-gray-700">
          {label} {isRequired && "*"}
        </label>
      )}

      <input
        ref={ref}
        id={name}
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        className={`text-md rounded-md border p-3 outline-0 transition-all ${error ? "border-red-500" : "border-[#DEE2E6] bg-white"} `}
      />

      {validations && (
        <div className="flex flex-col gap-[2px] text-xs">
          {validations.map(({ message, check }, index) => {
            const isValid = check(value || "");
            return (
              <span
                key={index}
                className={`flex items-center gap-1 ${!isDirty && !invalid && "text-gray-500!"} ${isValid ? "text-green-500" : "text-red-500"}`}
              >
                {message}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MainInput;
