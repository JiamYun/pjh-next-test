"use client";

import React from "react";

import { useRouter } from "next/navigation";

interface Props {
  text: string;
  isChecked: boolean;
  error?: string;
  onClick: () => void;
  path?: string;
  mt?: number | string;
  mr?: number | string;
  ml?: number | string;
  mb?: number | string;
}

export const Checkbox: React.FC<Props> = ({
  text,
  isChecked,
  error,
  onClick,
  path,
  mt,
  mr,
  ml,
  mb,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div
      className="flex items-center"
      style={{
        marginTop: typeof mt === "number" ? `${mt}px` : mt,
        marginBottom: typeof mb === "number" ? `${mb}px` : mb,
        marginRight: typeof mr === "number" ? `${mr}px` : mr,
        marginLeft: typeof ml === "number" ? `${ml}px` : ml,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center justify-center w-5 h-5 rounded border border-gray-300 focus:outline-none ${isChecked ? "bg-main-500" : ""}`}
      >
        {/* {isChecked ? (
          <Icon type="solid" name="check" size={16} fill={colors.main[500]} />
        ) : null} */}
      </button>
      <span
        className={`ml-2 select-none ${path ? "underline cursor-pointer" : ""}`}
        style={{
          color: error ? "#FF2D1B" : "#454545",
        }}
        onClick={handleClick}
      >
        {text}
      </span>
    </div>
  );
};

export default Checkbox;
