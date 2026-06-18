import React, { type ReactNode } from "react";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
}

const CommonButton: React.FC<CommonButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "px-4  py-2 rounded-md font-medium transition text-sm cursor-pointer flex items-center justify-center gap-1 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: "bg-white text-black ",
    secondary: "bg-black text-white",
    tertiary: "bg-[#DBEAFE] text-[#1447E6] rounded-full",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonButton;
