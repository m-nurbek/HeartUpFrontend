import axios from 'axios';




export const handleHeartBeat = async (file) => {
    const axiosMLReq = axios.create({
        baseURL: 'http://192.168.1.102:9000',
    });

    try {
        const response = await axiosMLReq.post("/predict_audio", file);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle specific axios error
            console.error(error.message);
            // You can also log the entire error object to see more details
            console.error(error);
        } else {
            // Handle general errors
            console.error(error);
        }
    }
}
