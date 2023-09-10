export function conflictError(resource) {
  return {
      type: "conflict",
      message: `${resource} conflict!`
  }
}