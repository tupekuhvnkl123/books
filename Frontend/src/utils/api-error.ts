export const getApiErr = (error: any): string => {
  const apiError = error;

  const errorMsg =
    apiError?.response?.data?.error?.message ||
    "Something went wrong, try again later";
  return errorMsg;
};
