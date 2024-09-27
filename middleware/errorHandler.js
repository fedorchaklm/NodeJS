const errorHandler =  (error, _, res, next) => {
  res.status(error.statusCode || 500).json(
    {
      message: error.message
    }
  );
}

export default errorHandler;