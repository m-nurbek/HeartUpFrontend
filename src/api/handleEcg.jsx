import axios from 'axios';




export const handleEcg = async (file) => {
    const axiosMLReq = axios.create({
        baseURL: 'https://b27e-87-255-216-107.ngrok-free.app',
    });

    try {
        const response = await axiosMLReq.post("/predict", file);
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
