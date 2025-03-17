import Add from "./Add";
import BottomAngle from "./BottomAngle";
import Calendar from "./Calendar";
import Check from "./Check";
import Close from "./Close";
import Comment from "./Comment";
import LeftCurvedArrow from "./LeftCurvedArrow";
import Person from "./Person";
import PieChart from "./PieChart";

export type IconNameType =
  | "add"
  | "bottom-angle"
  | "calendar"
  | "check"
  | "close"
  | "comment"
  | "left-curved-arrow"
  | "person"
  | "pie-chart";

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
    case "calendar":
      IconComponet = Calendar;
      break;
    case "check":
      IconComponet = Check;
      break;
    case "close":
      IconComponet = Close;
      break;
    case "comment":
      IconComponet = Comment;
      break;
    case "left-curved-arrow":
      IconComponet = LeftCurvedArrow;
      break;
    case "person":
      IconComponet = Person;
      break;
    case "pie-chart":
      IconComponet = PieChart;
      break;
    default: {
      return null;
    }
  }

  return <IconComponet width={width} height={height} color={color} />;
};

export default Icon;
