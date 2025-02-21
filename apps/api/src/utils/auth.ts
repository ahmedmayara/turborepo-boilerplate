import bcryptjs from "bcryptjs";

/**
 * Hashes a password using bcrypt
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcryptjs.hash(password, 12);
};

/**
 * Compares a plain text password with a hashed password.
 * @param plainTextPassword - The plain text password.
 * @param hashedPassword - The hashed password.
 * @returns Whether the passwords match.
 */
export const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  return bcryptjs.compare(plainTextPassword, hashedPassword);
};
