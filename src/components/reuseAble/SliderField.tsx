import { Slider } from "@/components/ui/slider";

interface SliderFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const SliderField: React.FC<SliderFieldProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 30,
  step = 1,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[#0A0A0A] text-sm font-medium mb-1">{label}</span>
        <span className="text-base font-semibold text-[#0A0A0A]">{value}%</span>
      </div>

      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(val) => onChange(val[0])}
        className="w-full cursor-pointer [&_[data-slot='slider-track']]:h-[16px] [&_[data-slot='slider-thumb']]:w-[25px] [&_[data-slot='slider-thumb']]:h-[25px]"
      />
    </div>
  );
};

export default SliderField;
