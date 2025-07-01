import React, { useState } from 'react';
import { Calendar, Sparkles, Github, Twitter, Linkedin, Mail } from 'lucide-react';
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
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-mono font-bold">
              <span className="bg-gradient-to-r from-blue-800 via-indigo-700 to-blue-800 
                             bg-clip-text text-transparent bg-300% animate-pulse">
                Hey, Demo User
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-700 font-mono max-w-3xl mx-auto leading-relaxed">
              I built a tool to simplify your booking process—
              <span className="text-blue-700 font-semibold"> faster, smoother, and easier </span>
              for your clients
            </p>
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-xl
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         text-white font-mono font-semibold text-lg
                         shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40
                         transform hover:scale-105 transition-all duration-300 group"
            >
              <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Try the Demo</span>
              <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <p className="text-slate-600 font-mono text-sm">
              Experience the streamlined booking process
            </p>
          </div>

          {/* Social Media Links */}
          <div className="pt-12">
            <h3 className="text-lg font-mono font-semibold text-slate-800 mb-6">
              Connect with me
            </h3>
            <div className="flex justify-center space-x-6">
              {[
                {
                  icon: Github,
                  href: "https://github.com",
                  label: "GitHub",
                  color: "hover:text-gray-800 hover:bg-gray-100"
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                  color: "hover:text-blue-500 hover:bg-blue-50"
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  color: "hover:text-blue-700 hover:bg-blue-50"
                },
                {
                  icon: Mail,
                  href: "mailto:hello@example.com",
                  label: "Email",
                  color: "hover:text-green-600 hover:bg-green-50"
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl bg-white/60 border border-slate-200/50 
                             backdrop-blur-xl transition-all duration-300 shadow-lg
                             text-slate-600 ${social.color} group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
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