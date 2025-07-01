import React, { useState } from 'react';
import { Calendar, Sparkles, Github, Twitter, Linkedin, Instagram, Menu, X } from 'lucide-react';
import BookingModal from './components/BookingModal';
import { BookingData } from './types/booking';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<BookingData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBookingSubmit = (data: BookingData) => {
    setLastBooking(data);
    console.log('Booking submitted:', data);
  };

  const navigationItems = [
    'Virtual Tours',
    'Video',
    'Testimonials',
    'Pricing',
    'Contact us',
    "We're Hiring!"
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/60"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-6">
          {/* Empty space where logo was */}
          <div></div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`text-sm font-medium transition-colors duration-200 ${
                  item === "We're Hiring!" 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 z-20 bg-stone-900/95 backdrop-blur-md border-t border-stone-700/50">
            <div className="px-6 py-4 space-y-4">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block text-sm font-medium transition-colors duration-200 ${
                    item === "We're Hiring!" 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-center'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hey, Demo User
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed mb-8">
              I built a tool to simplify your booking process—faster, smoother, and easier for your clients.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-lg
                           bg-amber-600 hover:bg-amber-700 text-white font-semibold text-lg
                           shadow-xl shadow-amber-600/25 hover:shadow-amber-600/40
                           transform hover:scale-105 transition-all duration-300 group"
              >
                <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Schedule Consultation</span>
              </button>
              
              <button className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 
                               text-white font-semibold text-lg backdrop-blur-sm
                               border border-white/20 hover:border-white/30
                               transition-all duration-300">
                Download Price Guide
              </button>
              
              <button className="px-8 py-4 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 
                               text-white font-semibold text-lg backdrop-blur-sm
                               border border-stone-600/50 hover:border-stone-500/50
                               transition-all duration-300">
                Read Our Testimonials
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="py-20 px-6 lg:px-12 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-800 mb-6">
              Connect With Us
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Follow our journey and stay updated with the latest features and improvements
            </p>
          </div>

          <div className="flex justify-center items-center space-x-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="group p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl 
                           border border-stone-200/50 transition-all duration-300 
                           hover:scale-110 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50"
                aria-label={social.label}
              >
                <social.icon className="w-8 h-8 text-stone-600 group-hover:text-amber-700 
                                      transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-stone-600 font-medium">
              Built with ❤️ for better booking experiences
            </p>
          </div>
        </div>
      </div>

      {/* Last Booking Display */}
      {lastBooking && (
        <div className="px-6 lg:px-12 py-8 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-4xl mx-auto p-6 rounded-xl bg-white/80 backdrop-blur-sm 
                         border border-green-200/50 shadow-lg">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Consultation Scheduled Successfully
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-stone-700">
              <div>
                <span className="text-amber-700 font-semibold">Name:</span> {lastBooking.name}
              </div>
              <div>
                <span className="text-amber-700 font-semibold">Email:</span> {lastBooking.email}
              </div>
              <div>
                <span className="text-amber-700 font-semibold">Date:</span> {lastBooking.selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      )}

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