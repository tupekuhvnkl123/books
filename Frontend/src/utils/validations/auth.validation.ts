export const validateName = (name: string): string => {
  if (!name) return "שם הוא שדה חובה";
  if (!/^[a-zA-Zא-ת\s]{2,15}$/.test(name)) {
    return "שם צריך להכיל בין 2 ל-15 תווים ולכלול רק אותיות ורווחים";
  }
  return "";
};

export const validateUsername = (username: string) => {
  if (!username) return "שם משתמש הוא שדה חובה";
  if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/.test(username)) {
    return "שם משתמש צריך להיות לפחות 4 תווים ולכלול לפחות אות אחת";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "סיסמה היא שדה חובה";
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
    return "סיסמה צריכה להיות לפחות 6 תווים, לכלול לפחות אות אחת ומספר אחד";
  }
  return "";
};
