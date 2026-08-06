import logo from "@/assets/images/logo.png";
import {
  FaDiscord,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#03070A] text-white overflow-hidden border-t border-white/5">
      {/* SVG Ambient Glow Background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 822"
        fill="none"
        className="absolute bottom-0 left-0 w-full h-auto object-bottom-left pointer-events-none z-0"
      >
        <g filter="url(#filter0_f_741_5661)">
          <path
            d="M455.645 717.354C1140.65 1139.43 1812.05 550.667 2243.54 300C2081.33 703.378 1751.79 1515.2 1731.29 1535.48C1705.65 1560.83 786.836 1974.92 755.635 1963.87C730.674 1955.03 95.0701 1357.31 -219.612 1059.56C-400.884 705.31 -229.355 295.279 455.645 717.354Z"
            fill="url(#paint0_linear_741_5661)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_741_5661"
            x="-586.956"
            y="0"
            width="3130.49"
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
              result="effect1_foregroundBlur_741_5661"
            />
          </filter>
          <linearGradient
            id="paint0_linear_741_5661"
            x1="1575.38"
            y1="854.229"
            x2="276.806"
            y2="643.906"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#043045" />
            <stop offset="0.682692" stopColor="#0CBDC6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('/layer.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative z-10 px-6 md:px-31  pt-16 pb-8">
        {/* Top Content Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
          {/* Left Column: Brand, Description, Contact & Socials */}
          <div className="max-w-md">
            {/* White Logo Card */}
            <div className="w-21 h-21 bg-white rounded-lg p-2.5 flex items-center justify-center shadow-lg shadow-black/40 mb-6">
              <img
                src={logo}
                alt="Feasible Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Main Description */}
            <p className="text-[#D1D0D0] text-sm sm:text-base font-normal leading-relaxed mb-6">
              Professional real estate deal analysis. Built for investors who
              move fast and need numbers they can trust.
            </p>

            {/* Contact Section */}
            <div className="mb-6">
              <p className="text-white font-semibold text-sm sm:text-base mb-1">
                Contact:
              </p>
              <a
                href="mailto:cloverrealestate25@gmail.com"
                className="text-white hover:text-white text-sm sm:text-base underline underline-offset-4 transition-colors duration-200"
              >
                cloverrealestate25@gmail.com
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 text-white">
              <a
                href="https://discord.gg/I809xdNWs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="hover:text-white transition-all duration-200 transform hover:scale-110 p-1"
              >
                <FaDiscord className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.instagram.com/feasiblerealestate?utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white transition-all duration-200 transform hover:scale-110 p-1"
              >
                <FaInstagram className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.tiktok.com/@feasiblerealestate?_r=1&_t=ZP-9BdOFIJOcOt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="hover:text-white transition-all duration-200 transform hover:scale-110 p-1"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@FeasibleRealEstate"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-white transition-all duration-200 transform hover:scale-110 p-1"
              >
                <FaYoutube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Quick Links */}
          <div className="md:min-w-50 mt-2 md:mt-0">
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm sm:text-base font-normal text-white/80">
              <li>
                <a
                  href="#whop"
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  Get Access (Whop)
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  Member Login
                </Link>
              </li>
              <li>
                <a
                  href="#discord"
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  Free Discord
                </a>
              </li>
              <li>
                <Link
                  to="/analyze"
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  Product Screenshots
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full border-t border-white/10 my-8 sm:my-10" />

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white font-normal">
          <p>©2026, All right reserved.</p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="hover:text-white underline underline-offset-4 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-white underline underline-offset-4 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
