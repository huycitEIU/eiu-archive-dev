const getUserIdFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser.id; // Assuming the user object has an 'id' property
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    }
    return null;
};

export { getUserIdFromLocalStorage };