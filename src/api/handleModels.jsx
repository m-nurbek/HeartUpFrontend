import axios from 'axios';


const axiosRequestToUCL = axios.create({
    baseURL: 'https://d108-178-91-253-107.ngrok-free.app',
});

const axiosRequestToECG = axios.create({
    baseURL: 'https://fddb-178-91-253-107.ngrok-free.app'
})


export const postUCL = async () => {
    let data = {
        "survival": 2,
        "age": 50,
        "pericardialeffusion": true,
        "fractionalshortening": 0.5,
        "epss": 27,
        "lvdd": 3,
        "wallmotion_score": 7,
        "wallmotion_index": 1,
        "mult": 0.5
    }

    let response = await axiosRequestToUCL.post("/predict", data);

    console.log(response);
    return response.data;
}

export const postECG = async (file) => {
    let formData = new FormData();
    formData.append('files', file);

    let response = await axiosRequestToECG.post("/upload", formData);

    console.log("ECG:", response);
    return response.data;
}