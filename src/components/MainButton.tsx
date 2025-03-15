import Icon, { IconNameType } from "./icons";

type Props = {
  variant: "filled" | "outlined" | "text" | "rounded";
  title: string;
  iconName?: IconNameType;
  className?: string;
  onClick: () => void;
};

function MainButton({ variant, title, iconName, className, onClick }: Props) {
  const baseStyles = "px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer transition-all";
  const variantStyles = {
    filled: "text-white bg-main-100 hover:bg-main",
    outlined: "border border-main-100 hover:border-main",
    text: "text-main-100 hover:text-main p-0!",
    rounded: "text-white bg-main-100 hover:bg-main px-13 rounded-full!",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {iconName && <Icon iconName={iconName} />}

      <span>{title}</span>
    </button>
  );
}

export default MainButton;
