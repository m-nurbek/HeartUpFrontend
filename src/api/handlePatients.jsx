import { PATIENTS } from "./constants/apiEndpoints";
import axiosRequest from "./axiosConfig";


export async function getAllPatients() {
    try {
        let response = await axiosRequest.get(PATIENTS, {
            body: {}
        });
        console.log("ALL PATIENTS: " + response.data )
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
        console.log("PATIENT: " + response.data )
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

