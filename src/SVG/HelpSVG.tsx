import { SVGProps } from "./type";
const HelpSVG = ({ color, className }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    className={className}
    fill="none"
    viewBox="0 0 22 22"
  >
    <path
      stroke={color || "var(text-primary)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.056 6.892c1.073-.94 2.815-.94 3.888 0 1.075.94 1.075 2.463 0 3.403a2.713 2.713 0 0 1-.614.405c-.683.331-1.33.916-1.33 1.675v.688M19.25 11a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0ZM11 15.813h.007v.007H11v-.008Z"
    />
  </svg>
);
export default HelpSVG;
