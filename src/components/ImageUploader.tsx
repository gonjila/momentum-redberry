"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import Icon from "./icons";

interface IProps {
  isError?: boolean;
  onFileUpload: (file: File | null) => void;
}

function ImageUploader({ isError, onFileUpload }: IProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    onFileUpload(file);
    setImage(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    onFileUpload(null);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className={`relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed p-4 ${isError ? "border-red-500" : "border-gray-300"}`}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      <div className="relative aspect-square h-full" onClick={ev => image && ev.stopPropagation()}>
        <Image
          src={image || "/default-avatar.png"}
          alt="avatar"
          width={88}
          height={88}
          className="h-full w-full rounded-full object-cover"
        />
        {image && (
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
