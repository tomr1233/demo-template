import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';
import { TimeSlotSelectorProps, CalendarApiResponse, TimeSlot } from '../types/booking';

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ selectedTime, onTimeSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timezone, setTimezone] = useState('');
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
  }, []);

  // Fetch available slots when date changes
  useEffect(() => {
    fetchAvailableSlots();
  }, [currentDate, timezone]);

  const fetchAvailableSlots = async () => {
    if (!timezone) return;

    setIsLoading(true);
    setError(null);

    try {
      // Calculate start and end times for the API request
      // Get start of current month and end of next month to have enough data
      const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      startTime.setHours(0, 0, 0, 0);
      
      const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
      endTime.setHours(23, 59, 59, 999);

      const apiPayload = {
        json: {
          isTeamEvent: false,
          usernameList: ["tom-raukete"],
          eventTypeSlug: "quick-chat",
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          timeZone: timezone,
          duration: null,
          rescheduleUid: null,
          orgSlug: null,
          teamMemberEmail: null,
          routedTeamMemberIds: null,
          skipContactOwner: false,
          _shouldServeCache: null,
          routingFormResponseId: null,
          email: null,
          embedConnectVersion: "0",
          _isDryRun: false
        },
        meta: {
          values: {
            duration: ["undefined"],
            orgSlug: ["undefined"],
            teamMemberEmail: ["undefined"],
            _shouldServeCache: ["undefined"],
            routingFormResponseId: ["undefined"]
          }
        }
      };

      const response = await fetch(
        `https://calendar.expressnext.app/api/trpc/slots/getSchedule?input=${encodeURIComponent(JSON.stringify(apiPayload))}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CalendarApiResponse = await response.json();
      
      // Extract slots for the current date
      const currentDateKey = formatDateKey(currentDate);
      const slotsForDate = data.result.data.json.slots[currentDateKey] || [];
      
      // Convert API time strings to Date objects
      const slots = slotsForDate.map((slot: TimeSlot) => new Date(slot.time));
      
      setAvailableSlots(slots);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Failed to load available time slots. Please try again.');
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimezone = (timezone: string) => {
    // Convert timezone to a more readable format
    const parts = timezone.split('/');
    return `(${parts[parts.length - 1].replace('_', '/')})`;
  };

  const formatTimeSlot = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isTimeSelected = (timeValue: Date) => {
    if (!selectedTime) return false;
    return timeValue.getTime() === selectedTime.getTime();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  return (
    <div className="w-full">
      {/* Date Navigation Header */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-slate-100/70 border border-slate-200/50">
        <button
          onClick={() => navigateDay('prev')}
          disabled={isPastDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
          className="px-3 py-2 rounded-lg bg-slate-200/70 hover:bg-slate-300/70 
                     text-slate-600 hover:text-slate-800 transition-all duration-200
                     font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous Day
        </button>
        
        <div className="text-center">
          <div className="text-lg font-mono font-bold text-slate-800">
            {formatDate(currentDate)} {timezone && formatTimezone(timezone)}
          </div>
        </div>
        
        <button
          onClick={() => navigateDay('next')}
          className="px-3 py-2 rounded-lg bg-slate-200/70 hover:bg-slate-300/70 
                     text-slate-600 hover:text-slate-800 transition-all duration-200
                     font-mono text-sm"
        >
          Next Day
        </button>
      </div>

      {/* Current Date Display */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-mono font-semibold text-slate-800 mb-2">
          {currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <span className="ml-3 text-slate-600 font-mono">Loading available times...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 mb-6">
          <p className="text-red-700 font-mono text-sm text-center">{error}</p>
          <button
            onClick={fetchAvailableSlots}
            className="mt-2 w-full px-3 py-2 rounded-lg bg-red-100 hover:bg-red-200 
                       text-red-700 hover:text-red-800 transition-all duration-200 font-mono text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {/* No Slots Available */}
      {!isLoading && !error && availableSlots.length === 0 && (
        <div className="p-6 rounded-lg bg-slate-100/50 border border-slate-200/50 text-center">
          <Clock className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-600 font-mono">No available time slots for this date</p>
          <p className="text-slate-500 font-mono text-sm mt-1">Try selecting a different date</p>
        </div>
      )}

      {/* Time Slots Grid */}
      {!isLoading && !error && availableSlots.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => onTimeSelect(slot)}
              className={`
                px-3 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-200
                ${isTimeSelected(slot)
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/70 text-slate-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:text-blue-800 border border-slate-200/50 hover:border-blue-300/50'
                }
              `}
            >
              {formatTimeSlot(slot)}
            </button>
          ))}
        </div>
      )}

      {/* Selected Time Display */}
      {selectedTime && (
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 
                       border border-blue-200/50">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 text-blue-700" />
            <p className="text-center font-mono text-slate-700">
              <span className="text-blue-700 font-semibold">Selected:</span>{' '}
              <span className="text-slate-800 font-semibold">
                {selectedTime.toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZoneName: 'short'
                })}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;