import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Sparkles } from 'lucide-react';
import TimeSlotSelector from './TimeSlotSelector';
import { BookingModalProps, BookingData } from '../types/booking';

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onBookingSubmit }) => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    selectedDate: null
  });
  const [errors, setErrors] = useState<Partial<BookingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', selectedDate: null });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.selectedDate) {
      newErrors.selectedDate = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onBookingSubmit) {
      onBookingSubmit(formData);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-br from-stone-50/95 to-amber-50/95 backdrop-blur-xl 
                        rounded-2xl shadow-2xl border border-amber-200/30">
          
          {/* Close Button - Positioned absolutely with better spacing */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 rounded-lg bg-stone-200/50 hover:bg-stone-300/50 
                       border border-stone-300/50 hover:border-stone-400/50 
                       transition-all duration-200 group"
          >
            <X className="w-5 h-5 text-stone-600 group-hover:text-stone-800" />
          </button>

          {/* Content with increased top padding */}
          <form onSubmit={handleSubmit} className="pt-16 px-6 pb-6 space-y-8">
            
            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-mono font-medium text-stone-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg font-mono
                             bg-white/70 border border-stone-300/50
                             text-stone-800 placeholder-stone-500
                             focus:border-amber-400/50 focus:ring-2 focus:ring-amber-500/20
                             transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-mono font-medium text-stone-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg font-mono
                             bg-white/70 border border-stone-300/50
                             text-stone-800 placeholder-stone-500
                             focus:border-amber-400/50 focus:ring-2 focus:ring-amber-500/20
                             transition-all duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm font-mono">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-mono font-semibold text-stone-800 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-amber-700" />
                <span>Select Time</span>
              </h3>
              
              <div className="bg-white/50 rounded-xl p-6 border border-stone-200/50">
                <TimeSlotSelector
                  selectedTime={formData.selectedDate}
                  onTimeSelect={(time) => setFormData(prev => ({ ...prev, selectedDate: time }))}
                />
                
                {errors.selectedDate && (
                  <p className="text-red-600 text-sm font-mono mt-4">{errors.selectedDate}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-stone-200/50">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-mono font-semibold
                           bg-gradient-to-r from-amber-600 to-orange-600
                           hover:from-amber-700 hover:to-orange-700
                           text-white shadow-lg shadow-amber-500/25
                           hover:shadow-amber-500/40 hover:shadow-xl
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-300
                           flex items-center justify-center space-x-2 group"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Confirm Consultation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default BookingModal;