import axios from "axios";

const getUserProfileById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/user/${userId}/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching user profile ", error);
        throw error
    }
}

export {
    getUserProfileById
}