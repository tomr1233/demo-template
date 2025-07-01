import React, { useState } from 'react';
import { Calendar, Sparkles, Github, Twitter, Linkedin, Mail, Phone, Monitor } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-12 max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-mono font-bold leading-tight">
              <span className="text-slate-800">Hey </span>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 
                             bg-clip-text text-transparent">
                Demo User
              </span>
              <span className="text-slate-800">,</span>
              <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4"></div>
            </h1>
            
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl text-slate-800 font-mono max-w-3xl mx-auto leading-relaxed">
                I built a tool that{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 
                               bg-clip-text text-transparent font-semibold">
                  answers your customer calls
                </span>{' '}
                for you.
              </p>
              
              <p className="text-lg md:text-xl text-slate-600 font-mono max-w-2xl mx-auto leading-relaxed">
                It's a robot that talks to your customers on the phone, answers their 
                questions, and helps them get what they need — automatically.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <h3 className="text-xl md:text-2xl text-slate-700 font-mono font-medium">
              Choose how you'd like to try it:
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl
                           bg-gradient-to-r from-emerald-500 to-teal-500
                           hover:from-emerald-600 hover:to-teal-600
                           text-white font-mono font-semibold text-lg
                           shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40
                           transform hover:scale-105 transition-all duration-300 group"
              >
                <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Call Me</span>
              </a>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl
                           bg-gradient-to-r from-purple-500 to-violet-500
                           hover:from-purple-600 hover:to-violet-600
                           text-white font-mono font-semibold text-lg
                           shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40
                           transform hover:scale-105 transition-all duration-300 group"
              >
                <Monitor className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Test in Browser</span>
              </button>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-8">
            <div className="flex justify-center space-x-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 
                           transition-colors duration-300 font-mono text-sm group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-500 hover:text-slate-700 
                           transition-colors duration-300 font-mono text-sm group"
                aria-label="Website"
              >
                <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </div>
                <span>Website</span>
              </a>
            </div>
          </div>

          {/* Last Booking Display */}
          {lastBooking && (
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-green-100/80 to-emerald-100/80 
                           border border-green-200/50 backdrop-blur-xl shadow-lg">
              <h3 className="text-lg font-mono font-semibold text-green-800 mb-3">
                ✨ Booking Confirmed
              </h3>
              <div className="space-y-2 text-slate-700 font-mono text-sm">
                <p><span className="text-blue-700 font-semibold">Name:</span> {lastBooking.name}</p>
                <p><span className="text-blue-700 font-semibold">Email:</span> {lastBooking.email}</p>
                <p><span className="text-blue-700 font-semibold">Date:</span> {lastBooking.selectedDate?.toLocaleDateString('en-US', {
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