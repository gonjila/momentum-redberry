type IProps = {
  width?: number;
  height?: number;
  color?: string;
};

function Add({ width, height, color }: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={width || "24px"}
      height={height || "24px"}
      fill={color || "currentColor"}
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}

export default Add;
