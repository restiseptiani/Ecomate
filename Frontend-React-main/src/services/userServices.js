import api from "./api";

const userServices = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error("Error Fetch User Profile", error);
        throw error;
    }
};

export default userServices;
