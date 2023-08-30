import { SVGProps } from "./type";
const SunSVG = ({ color, className }: SVGProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke={color || "#fff"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21.752 15.002A9.717 9.717 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25a9.75 9.75 0 0 0 15.159 8.113 9.753 9.753 0 0 0 3.593-4.361Z"
    />
  </svg>
);
export default SunSVG;
