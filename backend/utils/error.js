export const errorHandler = (statusCode, message) => {
  const error = new Error();//this will create new error object and in this there are two properties of object statusCode and mesaage so we set those in properties 
  error.statusCode = statusCode;
  error.message = message;
  return error;
}