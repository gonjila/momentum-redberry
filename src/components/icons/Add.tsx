type IProps = {
  width?: number;
  height?: number;
  color?: string;
};

function Add({ width, height, color }: IProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "#e8eaed"}
    >
      <path d="M5 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 15V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Add;
