const messages = {
  400: "Bad request",
  401: "Unathorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

const HttpErrorCreator = (status, message = messages[status]) => {
  const er = new Error(message);
  er.status = status;
  return er;
};

export default HttpErrorCreator;
