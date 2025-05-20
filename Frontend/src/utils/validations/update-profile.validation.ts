export const validateName = (name: string): string => {
  if (!name) return "";
  if (!/^[a-zA-Zא-ת\s]{2,15}$/.test(name)) {
    return "שם צריך להכיל בין 2 ל-15 תווים ולכלול רק אותיות";
  }
  return "";
};

export const validatePhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return ""; // Optional, so no error if empty

  const pattern = /^05[0-9]{8}$/;
  if (!pattern.test(phoneNumber)) {
    return "מספר טלפון חייב להיות בפורמט ישראלי תקני (לדוגמה: 0501234567)";
  }

  return "";
};
