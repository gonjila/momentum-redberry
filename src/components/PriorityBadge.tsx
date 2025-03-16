import Image from "next/image";

import { PriorityType } from "@/types";

interface IProps extends PriorityType {
  size: "large" | "small";
}

function PriorityBadge({ id, name, icon, size }: IProps) {
  const colors: { [key: number]: string } = {
    1: "text-[#08A508] border-[#08A508]",
    2: "text-[#FFBE0B] border-[#FFBE0B]",
    3: "text-[#FA4D4D] border-[#FA4D4D]",
  };

  const iconSize = size === "large" ? 20 : 16;

  return (
    <div
      className={`flex items-center gap-1 rounded-sm border px-1.5 py-1 font-medium ${colors[id]} ${size === "small" && "text-xs"}`}
    >
      <Image src={icon} alt={name} width={iconSize} height={iconSize} />

      <span>{name}</span>
    </div>
  );
}

export default PriorityBadge;
