import { motion } from "framer-motion";

const count = 10;

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative w-40 h-40">
        {Array.from({ length: count }).map((_, i) => {
          const rotation = (360 / count) * i;
          const delay = i * 0.1;

          return (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-10"
              style={{
                transformOrigin: "center -40px",
                rotate: rotation,
              }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-white rounded-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
