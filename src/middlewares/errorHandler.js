// errorMiddleware.js

module.exports = (err, req, res, next) => {
    console.error(err.message || err); 
    const statusCode = err.statusCode || 500; 
    const message = err.message || "An error occurred";
    res.status(statusCode).json({ message });
  };
  