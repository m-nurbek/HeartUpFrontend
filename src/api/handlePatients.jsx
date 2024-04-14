import { PATIENTS } from "./constants/apiEndpoints";
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

export async function retrievePatient(id) {
    try {
        let response = await axiosRequest.get(PATIENTS + `/${id}`, {
            body: {}
        });
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
}

