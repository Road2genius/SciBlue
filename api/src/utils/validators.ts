// EMAIL
const EMAIL_CHECK_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

// PASSWORD
const PASSWORD_CHECK_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/u;

export const isValidEmail = (email: string): boolean =>
  EMAIL_CHECK_REGEX.test(email);

export const isStrongPassword = (password: string): boolean =>
  PASSWORD_CHECK_REGEX.test(password);
