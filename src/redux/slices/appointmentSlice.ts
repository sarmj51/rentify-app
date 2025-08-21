import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
    id: string;
    propertyId: string;
    userId: string;
    date: string;
}

interface AppointmentState {
    appointments: Appointment[]
}

const initialState: AppointmentState = {
    appointments: [],
}


const appointmentSlice = createSlice({
    name: "appointmnet",
    initialState,
    reducers: {
        setAppointments: (state, action: PayloadAction<Appointment[]>) => {
            state.appointments = action.payload;
        },
        addAppointment: (state, action: PayloadAction<Appointment>) => {
            state.appointments.push(action.payload)
        },
    },
});

export const { setAppointments, addAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;