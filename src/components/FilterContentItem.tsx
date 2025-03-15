import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import Icon from "./icons";

type IProps = {
  title: string;
  imageSrc?: string | StaticImport;
  isSelected: boolean;
  onSelect: () => void;
};

function FilterContentItem({ title, imageSrc, isSelected, onSelect }: IProps) {
  return (
    <div onClick={onSelect} className="flex max-w-max cursor-pointer items-center gap-4">
      <div
        className={`relative flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all duration-1000 ${
          isSelected && "border-main text-main"
        }`}
      >
        <div className={`absolute transition-all ${isSelected ? "opacity-100" : "opacity-0"}`}>
          <Icon iconName="check" />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title + " profile photo"}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full"
          />
        )}

        <span>{title}</span>
      </div>
    </div>
  );
}

export default FilterContentItem;
