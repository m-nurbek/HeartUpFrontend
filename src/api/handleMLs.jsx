import axios from 'axios';


const axiosMLReq = axios.create({
    baseURL: 'https://acbb-87-255-216-107.ngrok-free.app',
});

export const handleMLs = async (data) => {
    try {
        const response = await axiosMLReq.post("/upload", data);
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
