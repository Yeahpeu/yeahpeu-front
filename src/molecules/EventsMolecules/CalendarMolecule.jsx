import { useState } from "react";
import MyCalendar from "../../components/Cards/MyCalendar";
import MyScheduleCard from "../../components/Cards/MyScheduleCard";
import moment from "moment";
import MyAddButton from "../../components/common/MyAddButton";
import { useScheduleStore } from "../../stores/scheduleStore"; 

const CalendarMolecule = () => {
  const schedules = useScheduleStore((state) => state.schedules); 
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));


  const filteredEvents = selectedDate
    ? schedules.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toISOString().split("T")[0] === selectedDate;
      })
    : [];

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center">
      <MyCalendar
        events={schedules.map((e) => e.date?.split("T")[0])} 
        setSelectedDate={setSelectedDate}
      />

      {selectedDate && (
        <div className="mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <MyScheduleCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-lg">일정이 없습니다 ( °ᗝ° ).ᐟ </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-center border w-12 h-12 rounded-full mt-8">
        <MyAddButton />
      </div>
    </div>
  );
};

export default CalendarMolecule;
