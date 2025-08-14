import type { HTMLAttributes, JSX } from "react";

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

const Logo = ({ className, ...props }: LogoProps): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="none"
    viewBox="0 0 50 50"
    className="text-primary"
  >
    <rect width="50" height="50" fill="#fff" rx="12"></rect>
    <mask
      id="mask0_216_10921"
      width="50"
      height="50"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
      style={{ maskType: "luminance" }}
    >
      <rect width="50" height="50" fill="#fff" rx="12"></rect>
    </mask>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M18 25c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3M43 18.345C43 13.205 38.725 9 33.5 9S24 13.205 24 18.345V32s18.998-2.08 19-13.654zM14 37.208c-1.012 0-1.84-.77-1.84-1.709s.828-1.708 1.84-1.708 1.84.769 1.84 1.708c0 .94-.828 1.709-1.84 1.709m-7-1.71v.001C7 39.075 10.15 42 14 42s7-2.925 7-6.5V26S7.002 27.447 7 35.498"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default Logo;
