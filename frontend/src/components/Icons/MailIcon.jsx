import React from "react";
import { useTheme } from "../../utils/context/ThemeContext";
const MailIcon = ({ hover }) => {
  const theme = useTheme();
  return (
    <div style={{ display: "inline-block" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path>
      </svg>
    </div>
  );
};
export default MailIcon;
