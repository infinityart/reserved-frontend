import React from "react";

export const appointment = {
    selectedTreatments: [],
    selectedHairdresser: {},
    selectedScheduledAt: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
};

export const AppointmentDataContext = React.createContext(
    appointment
);