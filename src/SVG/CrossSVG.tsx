import { SVGProps } from "./type";
const CrossSVG = ({ color, className }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={color || "white"}
    width={24}
    strokeWidth={1.5}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);
export default CrossSVG;
