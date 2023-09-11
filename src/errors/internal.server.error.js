export function internalServerError() {
  return {
      type: "internalServer",
      message: "Internal server error"
  }
}