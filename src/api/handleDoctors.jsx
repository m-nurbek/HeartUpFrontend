import axiosRequest from "./axiosConfig";
import { DOCTORS } from "./constants/apiEndpoints";


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
