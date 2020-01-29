import React from "react";

export const appointment = {
    selectedDate: new Date(),
    selectedHairdresser: null,
    selectedTime: null,
    setSelectHairdresser: () => {},
    setSelectedDate: () => {},
    setSelectedTime: () => {}
};

export const AppointmentContext = React.createContext(
    appointment
);