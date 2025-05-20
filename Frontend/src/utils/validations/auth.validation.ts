export const validateName = (name: string): string => {
  if (!name) return "Name is a required field";
  if (!/^[a-zA-Zא-ת\s]{2,15}$/.test(name)) {
    return "Name must be between 2 and 15 characters and contain only letters and spaces";
  }
  return "";
};

export const validateUsername = (username: string) => {
  if (!username) return "Username is a required field";
  if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9]{4,}$/.test(username)) {
    return "Username must be at least 4 characters long and include at least one letter";
  }
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password is a required field";
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(password)) {
    return "Password must be at least 6 characters long and include at least one letter and one number";
  }
  return "";
};
