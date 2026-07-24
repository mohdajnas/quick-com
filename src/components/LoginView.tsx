import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Apple, Carrot, Egg, Milk } from 'lucide-react';

interface LoginViewProps {
  onLogin: () => void;
  onSkip: () => void;
}

export default function LoginView({ onLogin, onSkip }: LoginViewProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const isContinueEnabled = phoneNumber.length >= 10;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col bg-[#1a9b47]"
    >
      {/* Top Green Section with Vector Icons */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Scattered Vector Groceries */}
        <Apple className="absolute top-[15%] right-[10%] w-16 h-16 text-red-500 fill-red-500 rotate-12 drop-shadow-xl select-none" />
        <Carrot className="absolute top-[10%] left-[10%] w-20 h-20 text-orange-500 fill-orange-500 -rotate-12 drop-shadow-lg select-none" />
        <Egg className="absolute top-[60%] left-[15%] w-14 h-14 text-orange-100 fill-orange-100 -rotate-45 drop-shadow-xl select-none z-10" />
        <Apple className="absolute top-[70%] right-[25%] w-24 h-24 text-red-600 fill-red-600 rotate-[20deg] drop-shadow-2xl select-none z-10" />
        <Carrot className="absolute top-[50%] right-[5%] w-16 h-16 text-orange-400 fill-orange-400 -rotate-12 drop-shadow-lg select-none" />
        <Milk className="absolute -bottom-5 -right-5 w-32 h-32 text-white fill-white rotate-6 drop-shadow-2xl select-none" />

        <button
          onClick={onSkip}
          className="absolute top-6 right-6 bg-black/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-black/30 transition-colors z-20"
        >
          Skip
        </button>

        {/* Logo perfectly centered */}
        <div className="relative z-20 flex flex-col items-center">
          <img src="/fav.png" alt="Ethichera Logo" className="h-32 object-contain drop-shadow-md" />
        </div>
      </div>

      {/* Bottom White Card Section */}
      <div className="bg-white w-full rounded-t-3xl pt-8 pb-10 px-6 shadow-2xl flex flex-col gap-6" style={{ minHeight: '60%' }}>
        <h2 className="text-xl font-bold text-gray-900">Enter your number</h2>
        
        <div className="flex flex-col relative">
          <span className="absolute -top-2.5 left-4 bg-white px-1 text-[11px] font-semibold text-blue-600 z-10">
            Mobile Number
          </span>
          <div className="flex items-center border border-blue-600 rounded-xl px-4 py-3 bg-white">
            <div className="flex items-center gap-1.5 pr-3 border-r border-gray-200">
              <span className="text-xl leading-none">🇮🇳</span>
              <span className="text-gray-900 font-medium">+91</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="flex-1 ml-3 bg-transparent text-gray-900 font-medium outline-none placeholder:text-gray-400"
              placeholder=""
              autoFocus
            />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <button
            onClick={onLogin}
            disabled={!isContinueEnabled}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all ${
              isContinueEnabled
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          <p className="text-center text-xs text-gray-500">
            By clicking, I accept the <a href="#" className="font-semibold text-gray-700 underline">privacy policy</a> and <a href="#" className="font-semibold text-gray-700 underline">terms of use</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
