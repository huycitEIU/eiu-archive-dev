import logger from "../utils/logger.js";

export const logRequest = (req, res, next) => {
    const startTime = Date.now();

    res.on("finish", () => {
        logger.info(
            {
                method: req.method,
                url: req.url,
                status: res.status,
                duration: `${Date.now() - startTime}ms`,
            },
            "HTTP Request"
        );
    });

    next();
};