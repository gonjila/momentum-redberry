import { DepartmentType } from "@/types";

interface IProps extends DepartmentType {
  size: "large" | "small";
}

const colors = ["#F80000", "#721422", "#2D572C", "#1e81b0", "#e28743", "#20214F", "#256D7B"];

function DepartmentsBadge({ id, name, size }: IProps) {
  return (
    <div
      className={`rounded-full bg-[#FF66A8] px-4 py-1.5 text-white ${size === "small" && "text-xs"}`}
      style={{ backgroundColor: colors[id] || "#FF66A8" }}
    >
      {name}
    </div>
  );
}

export default DepartmentsBadge;
