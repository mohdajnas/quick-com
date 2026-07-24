import { motion } from 'motion/react';

export default function SplashView() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1ba84d]"
    >
      <img
        src="/1.png"
        alt="Ethichera Splash"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
