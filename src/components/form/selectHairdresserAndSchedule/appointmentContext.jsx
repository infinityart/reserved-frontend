import React from "react";

export const appointment = {
    selectedDate: new Date(),
    selectedHairdresser: null,
    selectedTime: null,
    timetable: null,
    setSelectHairdresser: () => {},
    setSelectedDate: () => {},
    setSelectedTime: () => {},
    setTimetable: () => {},
    resetData: () => {}
};

export const AppointmentContext = React.createContext(
    appointment
);