import axiosRequest from "./axiosConfig";
import {DOCTORS, PERSONAL_DOCTOR_INFO} from "./constants/apiEndpoints";


export async function getAllDoctors() {
    try {
        let response = await axiosRequest.get(DOCTORS, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function getPersonalDoctorInfo() {
    try {
        let response = await axiosRequest.get(PERSONAL_DOCTOR_INFO, {
            body: {}
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function updatePersonalDoctorInfo(phone, specialization, aboutme, work_location, first_name, last_name, email, photo = null) {
    let data = new FormData();
    data.append('phone', phone);
    data.append('specialization', specialization);
    data.append('aboutme', aboutme);
    data.append('work_location', work_location);
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('email', email);

    if (photo) {
        data.append('photo', photo, photo.name);
    }

    try {
        let response = await axiosRequest.patch(PERSONAL_DOCTOR_INFO,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function retrieveDoctor(id) {
    try {
        let response = await axiosRequest.get(DOCTORS + `${id}`, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}
