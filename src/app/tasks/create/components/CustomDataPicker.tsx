"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, Control } from "react-hook-form";

import { Icon } from "@/components";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  format?: string;
  isRequired?: boolean;
};

export default function CustomDatePicker({
  name,
  control,
  label,
  format = "dd/MM/YYYY",
  isRequired,
}: Props) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-gray-700">
          {label} {isRequired && "*"}
        </label>
      )}

      <div
        className={`relative flex flex-col rounded-md border bg-white transition-all ${
          error ? "border-red-500" : "border-[#DEE2E6]"
        }`}
      >
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <Icon iconName="calendar" />
        </div>

        <DatePicker
          selected={value}
          placeholderText={format}
          onChange={onChange}
          dateFormat={format}
          className={`text-md w-full p-3 pl-12 outline-0`}
        />
      </div>
    </div>
  );
}
