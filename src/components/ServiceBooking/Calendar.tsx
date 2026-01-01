import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString(
    "fr-FR",
    { month: "long", year: "numeric" }
  );

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isSameDay = (date: Date, day: number) =>
    date.getDate() === day &&
    date.getMonth() === currentMonth &&
    date.getFullYear() === currentYear;

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-lg text-slate-800 tracking-tight capitalize">
          {monthName}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Jours */}
      <div className="grid grid-cols-7 text-center">
        {["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"].map((day) => (
          <div
            key={day}
            className="text-[10px] font-black text-slate-300 pb-6 tracking-widest"
          >
            {day}
          </div>
        ))}

        {/* Espaces vides */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Jours du mois */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(currentYear, currentMonth, day);

          const isSelected = selectedDate && isSameDay(selectedDate, day);

          const isDisabled = date < new Date(today.setHours(0, 0, 0, 0));

          return (
            <button
              key={day}
              onClick={() => !isDisabled && onDateSelect(date)}
              disabled={isDisabled}
              className={`h-12 w-12 mx-auto mb-2 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "hover:bg-slate-50 text-slate-600"
                }
                ${isDisabled ? "text-slate-200 cursor-not-allowed" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
