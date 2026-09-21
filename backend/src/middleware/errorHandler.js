export function notFound(request, response) {
  response.status(404).json({ message: `Route not found: ${request.originalUrl}` });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);

  if (error?.name === "ValidationError") {
    return response.status(400).json({ message: "Invalid request data." });
  }

  return response.status(error.status || 500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong. Please try again."
        : error.message,
  });
}

