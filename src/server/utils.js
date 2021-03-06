const renderError = (error, request, response) => {
  response.send(`ERROR: ${error.message}\n\n${error.stack}`);
};

module.exports = { renderError };
