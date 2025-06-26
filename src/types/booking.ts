export interface BookingData {
  name: string;
  email: string;
  selectedDate: Date | null;
}

export interface TimeSlot {
  time: string; // ISO string from API
}

export interface CalendarApiResponse {
  result: {
    data: {
      json: {
        slots: {
          [date: string]: TimeSlot[];
        };
      };
    };
  };
}

export interface TimeSlotSelectorProps {
  selectedTime: Date | null;
  onTimeSelect: (time: Date) => void;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSubmit?: (data: BookingData) => void;
}