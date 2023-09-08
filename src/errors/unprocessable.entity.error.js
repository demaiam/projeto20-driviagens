export function notFoundError(resource) {
  return {
      type: "unprocessableEntity", 
      message: `${resource} unprocessable`
  }
}