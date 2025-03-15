import Add from "./Add";
import BottomAngle from "./BottomAngle";

export type IconNameType = "add" | "bottom-angle";

interface IconProps {
  iconName: IconNameType;
  width?: number;
  height?: number;
  color?: string;
}

const Icon = ({ iconName, width, height, color }: IconProps) => {
  let IconComponet = null;

  switch (iconName) {
    case "add":
      IconComponet = Add;
      break;
    case "bottom-angle":
      IconComponet = BottomAngle;
      break;
    default: {
      return null;
    }
  }

  return <IconComponet width={width} height={height} color={color} />;
};

export default Icon;
