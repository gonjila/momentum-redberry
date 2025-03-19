"use client";

import { HTMLInputTypeAttribute } from "react";
import { useController, Control } from "react-hook-form";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  type?: HTMLInputTypeAttribute | "textarea";
  isRequired?: boolean;
  placeholder?: string;
  rows?: number;
  validations?: { message: string; check: (value: string) => boolean }[];
};

function MainField({
  name,
  control,
  label,
  type = "text",
  isRequired,
  placeholder,
  rows,
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

      <div
        className={`rounded-md border bg-white transition-all ${
          error ? "border-red-500" : "border-[#DEE2E6]"
        }`}
      >
        {type === "textarea" ? (
          <textarea
            ref={ref}
            id={name}
            placeholder={placeholder}
            rows={rows || 4}
            value={value}
            onChange={onChange}
            className="text-md w-full resize-none p-3 outline-0"
          />
        ) : (
          <input
            ref={ref}
            id={name}
            type={type}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
            className="`text-md w-full p-3 outline-0"
          />
        )}
      </div>

      {validations && (
        <div className="flex flex-col gap-[2px] text-xs">
          {validations.map(({ message, check }, index) => {
            const isValid = check(value || "");
            return (
              <span
                key={index}
                className={`flex items-center gap-1 ${!isDirty && !invalid && "text-gray-500!"} ${
                  isValid ? "text-green-500" : "text-red-500"
                }`}
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

export default MainField;
