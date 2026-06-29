import image from "../assets/images/analyze.png";
interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeroBackground({
  children,
  className = "",
}: HeroBackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      <img
        src={image}
        alt="Analyze Background"
        className="absolute inset-0 z-0 object-cover w-full"
      />

      <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
    </div>
  );
}
