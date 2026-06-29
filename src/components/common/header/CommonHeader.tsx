import clsx from "clsx";
import React, { type ReactNode } from "react";

interface CommonHeaderProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const CommonHeader: React.FC<CommonHeaderProps> = ({
  children,
  className = "",
  size = "lg",
  ...props
}) => {
  // Only base style is optional
  const baseStyles = "flex items-center  gap-1";

  // Fixed leading for each size
  const sizeStyles: Record<typeof size, string> = {
    xs: "text-xs leading-4 text-[#4A5565] ",
    sm: "text-sm leading-5 text-[#4A5565] font-normal",
    md: "text-base leading-6 !text-[#5B667B] font-normal",
    lg: "text-base sm:text-lg leading-5 sm:leading-7 font-semibold text-[#0A0A0A]",
    xl: " text-lg sm:text-xl leading-7 sm:leading-8 font-semibold text-[#1E2939]",
    "2xl": "text-2xl leading-9 font-bold",
    "3xl": "text-2xl sm:text-3xl leading-9 sm:leading-10 font-bold",
    "4xl": "text-4xl leading-[3rem] font-bold",
  };

  return (
    <h2 className={clsx(baseStyles, sizeStyles[size], className)} {...props}>
      {children}
    </h2>
  );
};

export default CommonHeader;
