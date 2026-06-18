interface CardContainerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: React.ReactNode;
  className?: string; // optional for extra styling
}

const sizeClasses: Record<
  NonNullable<CardContainerProps["size"]>,
  { padding: string; rounded: string }
> = {
  xs: { padding: "p-2 sm:p-3", rounded: "rounded-xl" },
  sm: { padding: "p-3 sm:p-4", rounded: "rounded-2xl" },
  md: { padding: "p-4 sm:p-5", rounded: "rounded-3xl" },
  lg: { padding: "p-5 sm:p-6", rounded: "rounded-[2.5rem]" },
  xl: { padding: "p-6 sm:p-7", rounded: "rounded-[3rem]" },
  "2xl": { padding: "p-7 sm:p-8", rounded: "rounded-[3.5rem]" },
  "3xl": { padding: "p-8 sm:p-9", rounded: "rounded-[4rem]" },
  "4xl": { padding: "p-10 sm:p-11", rounded: "rounded-[5rem]" },
};

const CardContainer: React.FC<CardContainerProps> = ({
  size = "md",
  children,
  className = "",
}) => {
  const { padding, rounded } = sizeClasses[size];

  return (
    <div
      className={`border-[#F3F4F6] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] ${padding} ${rounded} ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
