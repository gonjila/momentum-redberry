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
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "#343A40"}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
}

export default Add;
