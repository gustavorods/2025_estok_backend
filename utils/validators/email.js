/**
 * Checks whether an email address is valid according to common email formatting rules.
 * @param {string} email - The email address to validate.
 * @returns {boolean} true if the email is valid, false otherwise.
 */
function isValidEmail(email) {
  // Regular expression that defines a valid email format
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  /**
   * Regex explanation:
   * ^                       → Start of the string
   * [a-zA-Z0-9._%+-]+       → Local part (letters, numbers, and allowed special characters)
   * @                       → Requires the "@" symbol
   * [a-zA-Z0-9.-]+          → Domain name (letters, numbers, dots, and hyphens)
   * \.                      → Requires a dot before the top-level domain
   * [a-zA-Z]{2,}            → Top-level domain (at least two letters, e.g., com, org, br)
   * $                       → End of the string
   */

  // Remove leading/trailing spaces and test the email against the pattern
  return regex.test(email.trim());
}

/*

// Examples of usage:
console.log(isValidEmail("gustavo.silva@gmail.com"));    // ✅ true
console.log(isValidEmail("gustavo+dev@company.com.br")); // ✅ true
console.log(isValidEmail("gustavo@sub.domain.com"));     // ✅ true
console.log(isValidEmail("gustavo@domain"));             // ❌ false (missing .com, .br, etc.)
console.log(isValidEmail("@gmail.com"));                 // ❌ false (missing local part before @)

 */

module.exports = isValidEmail;
