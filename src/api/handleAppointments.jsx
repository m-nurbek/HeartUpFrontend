import {
    ACCEPTED_APPOINTMENTS_BY_PATIENT,
    APPROVE_APPOINTMENT,
    APPROVED_APPOINTMENTS_FOR_DOCTOR,
    BOOK_SLOT,
    BUSY_SLOTS_BY_DOCTOR_ID,
    DOCTOR_TIME_SLOTS,
    DOCTOR_TIME_SLOTS_BY_DATE,
    DOCTOR_TIME_SLOTS_BY_ID,
    DOCTOR_TIME_SLOTS_BY_ID_DATE, PENDING_APPOINTMENTS_BY_PATIENT,
    PENDING_APPOINTMENTS_FOR_DOCTOR,
    REJECT_APPOINTMENT,
    REJECTED_APPOINTMENTS_BY_PATIENT,
    REJECTED_APPOINTMENTS_FOR_DOCTOR
} from "./constants/apiEndpoints.jsx";
import axiosRequest from "./axiosConfig.jsx";


// Doctor has to be authenticated
export const createTimeSlots = async (date, start_time, end_time) => {
    return await axiosRequest.post(DOCTOR_TIME_SLOTS,
        {
            date: date,
            start_time: start_time,
            end_time: end_time
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getMyTimeSlotsDoctor = async () => {
    return await axiosRequest.get(DOCTOR_TIME_SLOTS)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getTimeSlotsByDoctorId = async (doctor_id) => {
    return await axiosRequest.get(DOCTOR_TIME_SLOTS_BY_ID(doctor_id))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getTimeSlotsByDoctorIdAndDate = async (doctor_id, date) => {
    return await axiosRequest.get(DOCTOR_TIME_SLOTS_BY_ID_DATE(doctor_id, date))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};


// date in the format "YYYY-MM-DD"
export const getTimeSlotByDate = async (date) => {
    return await axiosRequest.get(`${DOCTOR_TIME_SLOTS_BY_DATE}?date=${date}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error.response.data)
            return error.response.data;
        });
};

export const getPendingAppointmentsDoctor = async () => {
    return await axiosRequest.get(PENDING_APPOINTMENTS_FOR_DOCTOR)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getApprovedAppointmentsDoctor = async () => {
    return await axiosRequest.get(APPROVED_APPOINTMENTS_FOR_DOCTOR)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getRejectedAppointmentsDoctor = async () => {
    return await axiosRequest.get(REJECTED_APPOINTMENTS_FOR_DOCTOR)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const approveAppointment = async (appointment_id) => {
    return await axiosRequest.post(APPROVE_APPOINTMENT, {
        appointment_id: appointment_id
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

export const rejectAppointment = async (appointment_id) => {
    return await axiosRequest.post(REJECT_APPOINTMENT, {
        appointment_id: appointment_id
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
}

export const bookSlot = async (slot_id) => {
    return await axiosRequest.post(BOOK_SLOT,
        {
            slot_id: slot_id
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const busySlotsByDoctorId = async (doctor_id) => {
    return await axiosRequest.get(BUSY_SLOTS_BY_DOCTOR_ID(doctor_id))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getAcceptedAppointmentsByPatient = async () => {
    return await axiosRequest.get(ACCEPTED_APPOINTMENTS_BY_PATIENT)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getRejectedAppointmentsByPatient = async () => {
    return await axiosRequest.get(REJECTED_APPOINTMENTS_BY_PATIENT)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const getPendingAppointmentsByPatient = async () => {
    return await axiosRequest.get(PENDING_APPOINTMENTS_BY_PATIENT)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};
