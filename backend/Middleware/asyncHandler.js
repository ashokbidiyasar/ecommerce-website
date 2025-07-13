// This is a function that takes another function as input HOF(high order function)
const asyncHandler = (fn) => {
  // It returns a new function that Express can use as middleware
  return function (req, res, next) {
    // Call the original function (which might be async)
    // and handle any errors using .catch
    Promise.resolve(fn(req, res, next)).catch((err) => next(err)); // Pass errors to Express error handler
  };
};

export default asyncHandler;
