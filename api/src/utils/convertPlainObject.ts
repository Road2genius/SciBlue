export const convertToPlainObject = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};
