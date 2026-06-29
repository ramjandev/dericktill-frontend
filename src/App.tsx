import { Outlet } from "react-router-dom";
import Footer from "./components/reuseAble/Footer";
import Navbar from "./components/reuseAble/Navbar";

const App = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 858"
        fill="none"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
        }}
      >
        <g filter="url(#filter0_f_557_16)">
          <path
            d="M314.088 717.352C891.378 1139.43 1457.21 550.665 1820.85 299.999C1684.15 703.376 1406.43 1515.2 1389.14 1535.48C1367.54 1560.82 593.202 1974.92 566.907 1963.87C545.871 1955.03 10.2109 1357.31 -254.989 1059.56C-407.758 705.309 -263.201 295.278 314.088 717.352Z"
            fill="url(#paint0_linear_557_16)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_557_16"
            x="-611.745"
            y="0"
            width="2732.59"
            height="2264.09"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="150"
              result="effect1_foregroundBlur_557_16"
            />
          </filter>
          <linearGradient
            id="paint0_linear_557_16"
            x1="1257.76"
            y1="854.228"
            x2="155.204"
            y2="703.733"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#043045" />
            <stop offset="0.682692" stopColor="#0CBDC6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Noise texture */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          opacity: 0.15,
          backgroundImage: `url('/layer.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
        }}
      />

      {/* Content above everything */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }} className=" py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
export default App;
