"use client";
import { DayPicker, Matcher } from "react-day-picker";
import "react-day-picker/style.css";
import { useController, Control } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components";
import { formatDateForDatePickerValue } from "@/helpers";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  disabled?: Matcher;
  defaultValue?: Date;
};

export default function CustomDatePicker({
  name,
  control,
  label,
  placeholder = "DD.MM.YYYY",
  isRequired,
  disabled,
  defaultValue,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isPickerOpened, setIsPickerOpened] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: defaultValue || "" });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPickerOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedValue = (value && formatDateForDatePickerValue(value)) || "";

  return (
    <div ref={dropdownRef} className="flex flex-col gap-1.5">
      {label && (
        <label className="text-gray-700">
          {label} {isRequired && "*"}
        </label>
      )}

      <div
        onClick={() => setIsPickerOpened(prev => !prev)}
        className={`relative flex h-[50px] flex-col rounded-md border bg-white p-3 pl-11 transition-all ${
          error ? "border-red-500" : "border-[#DEE2E6]"
        }`}
      >
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <Icon iconName="calendar" />
        </div>

        <p className={formattedValue ? "" : "text-gray-500"}>{formattedValue || placeholder}</p>

        <div
          onClick={ev => ev.stopPropagation()}
          className={`absolute bottom-[120%] left-0 overflow-hidden rounded-lg border border-gray-300 bg-white transition-all duration-500 ${isPickerOpened ? "h-[368px] opacity-100" : "h-0 opacity-0"}`}
        >
          <DayPicker
            animate
            mode="single"
            selected={value}
            onSelect={val => {
              onChange(val);
              setIsPickerOpened(false);
            }}
            disabled={disabled}
            className={`text-md w-full px-6 py-3 outline-0`}
          />
        </div>
      </div>
    </div>
  );
}
