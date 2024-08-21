/* eslint-disable @typescript-eslint/no-explicit-any */
function removeProperty(obj: { [k: string]: any }, property: string) {
  const { [property]: unknown, ...rest } = obj;

  return rest;
}

export default removeProperty;
