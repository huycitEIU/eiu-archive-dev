import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    // Get the token from the request headers
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route handler 
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export { authenticateToken };