import { SVGProps } from "./type";
const ShuffleSVG = ({ color, className }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    fill="none"
    viewBox="0 0 18 18"
    className={className}
  >
    <path
      stroke={color || "var(text-primary)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.333 16 17 13.375m0 0-2.667-2.625M17 13.375h-3.556C10.99 13.375 9 11.416 9 9S7.01 4.625 4.556 4.625H1M14.333 2 17 4.625m0 0L14.333 7.25M17 4.625h-3.556c-1 0-1.923.325-2.666.875M1 13.375h3.556c1 0 1.923-.326 2.666-.875"
    />
  </svg>
);
export default ShuffleSVG;
