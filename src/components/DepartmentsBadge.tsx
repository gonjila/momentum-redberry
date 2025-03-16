import { DepartmentType } from "@/types";

interface IProps extends DepartmentType {
  size: "large" | "small";
}

function DepartmentsBadge({ id, name, size }: IProps) {
  return (
    <div className={`rounded-full bg-[#FF66A8] px-4 py-1.5 text-white ${size === "small" && "text-xs"}`}>
      {name}
    </div>
  );
}

export default DepartmentsBadge;
