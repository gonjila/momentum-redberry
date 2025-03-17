type IProps = {
  width?: number;
  height?: number;
  color?: string;
};

function LeftCurvedArrow({ width, height, color }: IProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      width={height || "24px"}
      height={width || "24px"}
      fill={color || "currentColor"}
    >
      <g clipPath="url(#clip0_8296_1684)">
        <path d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z" />
        <path d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z" />
      </g>
      <defs>
        <clipPath id="clip0_8296_1684">
          <rect width="16" height="16" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LeftCurvedArrow;
