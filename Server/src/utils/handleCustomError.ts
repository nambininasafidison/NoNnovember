export const handleCustomError = (statusCode: number, message: string) => {
  const error = new Error(message);
  error.message = message;
  const customError = { ...error, statusCode };
  return customError;
};
