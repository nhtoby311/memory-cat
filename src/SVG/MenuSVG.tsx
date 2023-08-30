import { SVGProps } from "./type";
const MenuSVG = ({ color, className }: SVGProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={color || "var(text-primary)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);
export default MenuSVG;
