"use client";

import { Icon } from "@/components";

interface IProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterType({ title, isActive, onClick }: IProps) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 px-[18px] py-3 transition-all ${isActive && "text-main"}`}
    >
      <span>{title}</span>
      <Icon iconName="bottom-angle" color={isActive ? "#8338EC" : undefined} />
    </button>
  );
}

export default FilterType;
