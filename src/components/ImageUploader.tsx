"use client";

import Image from "next/image";
import { useRef } from "react";
import { Control, useController } from "react-hook-form";

import Icon from "./icons";

interface IProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

function ImageUploader({ name, control }: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onChange(file);
  };

  const handleImageRemove = () => {
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={`relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed p-4 ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="relative aspect-square h-full" onClick={ev => value && ev.stopPropagation()}>
        <Image
          src={(value && URL.createObjectURL(value)) || "/default-avatar.png"}
          alt="avatar"
          width={88}
          height={88}
          className="h-full w-full rounded-full object-cover"
        />
        {value && (
          <button
            type="button"
            onClick={handleImageRemove}
            className="absolute right-1 bottom-1 rounded-full bg-gray-100 p-1 hover:bg-gray-200"
          >
            <Icon iconName="trash" width={14} height={14} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ImageUploader;
