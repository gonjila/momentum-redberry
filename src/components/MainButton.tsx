import { ButtonHTMLAttributes } from "react";

import Icon, { IconNameType } from "./icons";

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant: "filled" | "outlined" | "text" | "rounded";
  title: string;
  iconName?: IconNameType;
  iconSize?: number;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

function MainButton({
  type = "button",
  variant,
  title,
  iconName,
  iconSize,
  disabled,
  className,
  onClick,
}: Props) {
  const baseStyles = "px-4 py-2  rounded-lg flex items-center gap-1 cursor-pointer transition-all";
  const variantStyles = {
    filled: "text-white bg-main-100 hover:bg-main",
    outlined: "border border-main-100 hover:border-main",
    text: "text-main-100 hover:text-main p-0!",
    rounded: "text-white bg-main-100 hover:bg-main px-13 rounded-full!",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${disabled && "cursor-not-allowed!"}`}
    >
      {iconName && <Icon iconName={iconName} width={iconSize} height={iconSize} />}

      <span>{title}</span>
    </button>
  );
}

export default MainButton;
