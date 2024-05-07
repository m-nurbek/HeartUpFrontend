import {PATIENTS, PERSONAL_PATIENT_INFO} from "./constants/apiEndpoints";
import axiosRequest from "./axiosConfig";


export async function getAllPatients() {
    try {
        let response = await axiosRequest.get(PATIENTS, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function getPersonalPatientInfo() {
    try {
        let response = await axiosRequest.get(PERSONAL_PATIENT_INFO, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

export async function retrievePatient(id) {
    try {
        let response = await axiosRequest.get(PATIENTS + `${id}`, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

