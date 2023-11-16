
export const asynchandler = (API) => {
    return (req, res, next) => {
      API(req, res, next).catch((error) => {
        return next(new Error(error));
      });
    };
  };
  export const globalErrorHandling = (error, req, res, next) => {
    res.status(error.cause || 500).json({
      MessageErr: "failure error",
      error: error.message,
      error,
      stack: error.stack,
    });
  };
   