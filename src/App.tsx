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
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-stone-200/10 to-amber-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/80 to-orange-100/80 
                             border border-amber-200/50 backdrop-blur-xl shadow-lg">
                <Zap className="w-12 h-12 text-amber-700" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-mono font-bold">
              <span className="bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 
                             bg-clip-text text-transparent bg-300% animate-pulse">
                Render Studio
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-stone-700 font-mono max-w-2xl mx-auto leading-relaxed">
              Experience premium architectural visualization with our 
              <span className="text-amber-700 font-semibold"> award-winning </span>
              3D rendering services
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl
                         bg-gradient-to-r from-amber-600 to-orange-600
                         hover:from-amber-700 hover:to-orange-700
                         text-white font-mono font-semibold text-lg
                         shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40
                         transform hover:scale-105 transition-all duration-300 group"
            >
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Schedule Consultation</span>
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <p className="text-stone-600 font-mono text-sm">
              Book a personalized consultation for your project
            </p>
          </div>

          {/* Demo Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Easy booking system with real-time availability"
              },
              {
                icon: Zap,
                title: "Quick Response",
                description: "Fast project turnaround with premium quality"
              },
              {
                icon: Sparkles,
                title: "Premium Service",
                description: "Professional consultation with expert guidance"
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white/60 border border-stone-200/50 
                                         backdrop-blur-xl hover:bg-white/70 transition-all duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-amber-700 mb-4 mx-auto" />
                <h3 className="text-lg font-mono font-semibold text-stone-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-600 font-mono text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Last Booking Display */}
          {lastBooking && (
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-green-100/80 to-emerald-100/80 
                           border border-green-200/50 backdrop-blur-xl shadow-lg">
              <h3 className="text-lg font-mono font-semibold text-green-800 mb-3">
                ✨ Consultation Scheduled
              </h3>
              <div className="space-y-2 text-stone-700 font-mono text-sm">
                <p><span className="text-amber-700 font-semibold">Name:</span> {lastBooking.name}</p>
                <p><span className="text-amber-700 font-semibold">Email:</span> {lastBooking.email}</p>
                <p><span className="text-amber-700 font-semibold">Date:</span> {lastBooking.selectedDate?.toLocaleDateString('en-US', {
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