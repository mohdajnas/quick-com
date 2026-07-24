import { motion } from 'motion/react';
import { Search, Navigation, MapPin, ChevronRight } from 'lucide-react';

interface LocationViewProps {
  onLocationSelect: () => void;
}

export default function LocationView({ onLocationSelect }: LocationViewProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 220 }}
      className="fixed inset-0 z-40 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="px-4 py-6 shadow-sm z-10 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900">Select your location</h2>
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
            placeholder="Search for your area or apartment"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        
        {/* Current Location Button */}
        <button 
          onClick={onLocationSelect}
          className="w-full flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
        >
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
            <Navigation className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-600">Use current location</h3>
            <p className="text-xs text-gray-500 mt-0.5">Using GPS</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-300" />
        </button>

        {/* Saved Addresses */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Saved Addresses</h4>
          
          <button 
            onClick={onLocationSelect}
            className="w-full flex items-start gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Home</h3>
              </div>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Flat 402, Royal Palms, Sector 15, Gurgaon, Haryana - 122001</p>
            </div>
          </button>

          <button 
            onClick={onLocationSelect}
            className="w-full flex items-start gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">Work</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Tower B, Cyber City, DLF Phase 2, Gurgaon, Haryana - 122002</p>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
