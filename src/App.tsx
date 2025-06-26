import React, { useState } from 'react';
import { Calendar, Sparkles, Zap } from 'lucide-react';
import BookingModal from './components/BookingModal';
import { BookingData } from './types/booking';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);

  const handleBookingSubmit = (data: BookingData) => {
    setLastBooking(data);
    console.log('Booking submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                             border border-blue-500/30 backdrop-blur-xl">
                <Zap className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-mono font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 
                             bg-clip-text text-transparent bg-300% animate-pulse">
                Future Tech
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 font-mono max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of booking systems with our 
              <span className="text-blue-400 font-semibold"> AI-powered </span>
              scheduling platform
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl
                         bg-gradient-to-r from-blue-500 to-purple-500
                         hover:from-blue-600 hover:to-purple-600
                         text-white font-mono font-semibold text-lg
                         shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40
                         transform hover:scale-105 transition-all duration-300 group"
            >
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Book Your Session</span>
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <p className="text-gray-400 font-mono text-sm">
              Click to experience our advanced booking modal
            </p>
          </div>

          {/* Demo Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              {
                icon: Calendar,
                title: "Interactive Calendar",
                description: "Smart date selection with future-forward UI"
              },
              {
                icon: Zap,
                title: "Instant Booking",
                description: "Lightning-fast form processing and validation"
              },
              {
                icon: Sparkles,
                title: "Premium Design",
                description: "Production-ready components with modern aesthetics"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-gray-800/30 border border-gray-700/30 
                                         backdrop-blur-xl hover:bg-gray-800/40 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-lg font-mono font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-mono text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Last Booking Display */}
          {lastBooking && (
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 
                           border border-green-500/20 backdrop-blur-xl">
              <h3 className="text-lg font-mono font-semibold text-green-400 mb-3">
                ✨ Last Booking Confirmed
              </h3>
              <div className="space-y-2 text-gray-300 font-mono text-sm">
                <p><span className="text-blue-400">Name:</span> {lastBooking.name}</p>
                <p><span className="text-blue-400">Email:</span> {lastBooking.email}</p>
                <p><span className="text-blue-400">Date:</span> {lastBooking.selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookingSubmit={handleBookingSubmit}
      />
    </div>
  );
}

export default App;