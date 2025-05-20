export const getApiErr = (error: any): string => {
  const apiError = error;

  const errorMsg =
    apiError?.response?.data?.error?.message ||
    "שגיאה בשרת, צור קשר ונסה שוב מאוחר יותר";
  return errorMsg;
};
