/**
 * Checks whether a password meets the required security standards.
 * Rules:
 * - At least 8 characters long
 * - Contains uppercase and lowercase letters
 * - Contains at least one number
 * - Contains at least one special character
 *
 * @param {string} password - The password to validate.
 * @returns {boolean} true if the password is valid, false otherwise.
 */
function isValidPassword(password) {
  // Regular expression for password validation
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/;

  /**
   * Regex explanation:
   * ^                                → Start of the string
   * (?=.*[a-z])                      → Requires at least one lowercase letter
   * (?=.*[A-Z])                      → Requires at least one uppercase letter
   * (?=.*\d)                         → Requires at least one digit
   * (?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]) → Requires at least one special character
   * .{8,}                            → Minimum of 8 characters in total
   * $                                → End of the string
   */

  return regex.test(password);
}

/*
// Examples:
console.log(isValidPassword("Password123!")); // ✅ true
console.log(isValidPassword("password123!")); // ❌ false (no uppercase letter)
console.log(isValidPassword("PASSWORD123!")); // ❌ false (no lowercase letter)
console.log(isValidPassword("Password!"));    // ❌ false (no number)
console.log(isValidPassword("Pass123"));      // ❌ false (too short)=
*/

module.exports = isValidPassword;
