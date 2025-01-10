const logger = (req, res, next) => {
    console.log('Middleware function');
    console.log(`${req.method} ${req.protocol}:/${req.get('host')}${req.originalUrl}`);
    next();
};

export default logger;