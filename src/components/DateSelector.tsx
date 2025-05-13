
import { useState } from "react";
import { format, addDays, isSameDay } from "date-fns";

interface DateSelectorProps {
  onDateSelect: (date: Date) => void;
}

const DateSelector = ({ onDateSelect }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const today = new Date();
  const nextWeek = Array.from({ length: 7 }).map((_, index) => {
    return addDays(today, index);
  });
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };
  
  return (
    <div className="py-2 overflow-x-auto">
      <div className="flex space-x-2 px-2">
        {nextWeek.map((date) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateSelect(date)}
              className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] border ${
                isSelected 
                  ? 'bg-tut-blue text-white border-tut-blue' 
                  : isToday 
                    ? 'bg-white border-tut-blue text-tut-blue' 
                    : 'bg-white border-gray-200 text-gray-700'
              }`}
            >
              <span className="text-xs">
                {format(date, "EEE")}
              </span>
              <span className="text-lg font-bold">
                {format(date, "dd")}
              </span>
              <span className="text-xs">
                {format(date, "MMM")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
