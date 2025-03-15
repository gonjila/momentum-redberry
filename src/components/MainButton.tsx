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
    filled: "text-white bg-purple-500 hover:bg-purple-700",
    outlined: "border border-purple-300 hover:border-purple-700",
    text: "text-purple-500 hover:text-purple-700 p-0!",
    rounded: "text-white bg-purple-500 hover:bg-purple-700 px-13 rounded-full!",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {iconName && <Icon iconName={iconName} />}

      <span>{title}</span>
    </button>
  );
}

export default MainButton;
