// add middlewares here related to projects

function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({
      message: "Internal Server Error",
      err: err.message,
      stack: err.stack,
    });
  }
  
  module.exports = {
    errorHandler,
    
  };
  