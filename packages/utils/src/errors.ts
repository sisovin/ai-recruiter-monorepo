/**
 * Handles API errors by returning a standardized error response.
 *
 * @param error - The error object.
 * @returns The standardized error response.
 */
export function handleApiError(error: any): { statusCode: number; message: string } {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error.response) {
    statusCode = error.response.status || 500;
    message = error.response.data?.message || 'Internal Server Error';
  } else if (error.request) {
    statusCode = 503;
    message = 'Service Unavailable';
  } else if (error.message) {
    message = error.message;
  }

  return { statusCode, message };
}
