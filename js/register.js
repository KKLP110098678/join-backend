const CONFIG = {
  routes: {
    login: "../html/login.html", // Default login redirect path
  },
};

const newUser = { nuName: "", nuEmail: "", nuPassword: "" };

async function handleRegisterUser(event) {
  event.preventDefault();
const newUser = { nuName: "", nuEmail: "", nuPassword: "" };

/**
 * Validates that all required input fields in the registration form are filled and valid.
 *
 * This function calls several helper validation functions:
 * - checkInputName(): Ensures the name field is not empty and valid.
 * - checkInputEmail(): Ensures the email field is correctly formatted.
 * - checkInputPassword(): Ensures the password meets the required criteria.
 * - checkInputConfirmPassword(): Ensures the confirmation password matches the original.
 * - checkAcceptTerms(): Ensures the user has accepted the terms and conditions.
 *
 * @returns {boolean} Returns `true` if all inputs are valid, otherwise `false`.
 */
function checkEmptyInputs() {
  if (!checkInputName()) {
    return false;
  } else if (!checkInputEmail()) {
    return false;
  } else if (!checkInputPassword()) {
    return false;
  } else if (!checkInputConfirmPassword()) {
    return false;
  } else if (!checkAcceptTerms()) {
    return false;
  }
  return true;
}

/**
 * Handles the registration process for a new user.
 *
 * This asynchronous function validates all input fields before proceeding.
 * If all fields are valid, it attempts to create a new user record in the database
 * and then shows a success message followed by a redirect.
 *
 * @async
 * @function handleRegisterUser
 * @returns {Promise<void>} Returns a Promise that resolves when registration is complete.
 *
 * @throws {Error} Logs an error to the console if user registration fails.
 *
 * @example
 * // Example usage:
 * await handleRegisterUser();
 *
 * @see checkEmptyInputs - Validates that all required input fields are filled.
 * @see addNewUser - Adds a new user object to the database or storage.
 * @see showSuccessAndRedirect - Displays success message and navigates to another page.
 */
async function handleRegisterUser() {
  if (!checkEmptyInputs()) {
    return;
  }
  try {
    await addNewUser(newUser);
    showSuccessAndRedirect();
  } catch (error) {
    console.error("Error registering user:", error);
    const errorOverlay = document.getElementById("errorMessage");
    if (errorOverlay) {
      errorOverlay.textContent = "Registration failed. Please try again.";
      errorOverlay.classList.remove("d-none");
    }
  }
}

/**
 * Validates the username input field in the registration form.
 *
 * This function checks if the username field is empty.
 * If it's empty, an error message is displayed using `handleErrorSet`.
 * Otherwise, the input is considered valid.
 *
 * @function checkInputName
 * @returns {boolean} Returns `true` if the username is valid, otherwise `false`.
 *
 * @see handleErrorSet - Displays an error message and updates the input field state.
 */

function checkInputName() {
  const inName = document.getElementById("inName").value.trim();
  if (inName === "") {
    handleErrorSet(
      "inEmail",
      "fieldName",
      "usernameError",
      false,
      "Please enter a valid Username!"
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Checks asynchronously whether a username already exists in the database or user list.
 *
 * This function trims and validates the provided username, then calls `isUserNameTaken`
 * to verify if it's already in use. If the username exists, an error message is displayed
 * using `handleErrorSet`. If it's available, the username is assigned to `newUser.nuName`.
 *
 * @async
 * @function isUserExistByName
 * @param {string} inName - The username input to validate and check for existence.
 * @returns {Promise<boolean>} Resolves to `true` if the username is available, otherwise `false`.
 *
 * @throws {Error} Returns `false` in case of any error during the check.
 *
 * @see isUserNameTaken - Checks if a username already exists in storage or database.
 * @see handleErrorSet - Displays or clears an error message for the username field.
 */

/**
 * Validates the username input field in the registration form.
 *
 * This function checks if the username field is empty.
 * If it's empty, an error message is displayed using `handleErrorSet`.
 * Otherwise, the input is considered valid.
 *
 * @function checkInputName
 * @returns {boolean} Returns `true` if the username is valid, otherwise `false`.
 *
 * @see handleErrorSet - Displays an error message and updates the input field state.
 */

function checkInputName() {
  const inName = document.getElementById("inName").value.trim();
  if (inName === "") {
    handleErrorSet(
      "inEmail",
      "fieldName",
      "usernameError",
      false,
      "Please enter a valid Username!"
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Checks asynchronously whether a username already exists in the database or user list.
 *
 * This function trims and validates the provided username, then calls `isUserNameTaken`
 * to verify if it's already in use. If the username exists, an error message is displayed
 * using `handleErrorSet`. If it's available, the username is assigned to `newUser.nuName`.
 *
 * @async
 * @function isUserExistByName
 * @param {string} inName - The username input to validate and check for existence.
 * @returns {Promise<boolean>} Resolves to `true` if the username is available, otherwise `false`.
 *
 * @throws {Error} Returns `false` in case of any error during the check.
 *
 * @see isUserNameTaken - Checks if a username already exists in storage or database.
 * @see handleErrorSet - Displays or clears an error message for the username field.
 */

async function isUserExistByName(inName) {
  if (!inName || !inName.trim()) {
    handleErrorSet(
      "in-email",
      "field-name",
      "username-error",
      false,
      "Username cannot be empty"
    );
    return false;
  }
  try {
    const exists = await isUserNameTaken(inName);
    if (exists) {
      handleErrorSet(
        "in-email",
        "field-name",
        "username-error",
        false,
        "Username already exists!"
      );
      return false;
    }
    newUser.nuName = inName;
    handleErrorSet("inEmail", "fieldName", "usernameError", true);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Validates the email input field in the registration form.
 *
 * This function checks if the email input is empty.
 * If it's empty, it displays an error message using `handleErrorSet`.
 * Otherwise, the email is considered valid.
 *
 * @function checkInputEmail
 * @returns {boolean} Returns `true` if the email field is valid, otherwise `false`.
 *
 * @see handleErrorSet - Displays or clears an error message for the email field.
 */

function checkInputEmail() {
  const inEmail = document.getElementById("inEmail").value.trim();
  if (inEmail === "") {
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Checks asynchronously whether an email already exists in the database or user list.
 *
 * This function first validates the provided email format using `validateEmailFormat`.
 * If the format is valid, it checks if the email is already in use through `isUserEmailTaken`.
 * Displays an appropriate error message via `handleErrorSet` if the email exists.
 * Otherwise, assigns the email to `newUser.nuEmail` and clears any previous error.
 *
 * @async
 * @function isUserExistByEmail
 * @param {string} inEmail - The email address to validate and check for existence.
 * @returns {Promise<boolean>} Resolves to `true` if the email is valid and not taken, otherwise `false`.
 *
 * @throws {Error} Returns `false` in case of any unexpected error during validation or lookup.
 *
 * @see validateEmailFormat - Validates that the email follows a proper format.
 * @see isUserEmailTaken - Checks if an email already exists in storage or database.
 * @see handleErrorSet - Displays or clears error messages for the email field.
 */

/**
 * Checks asynchronously whether an email already exists in the database or user list.
 *
 * This function first validates the provided email format using `validateEmailFormat`.
 * If the format is valid, it checks if the email is already in use through `isUserEmailTaken`.
 * Displays an appropriate error message via `handleErrorSet` if the email exists.
 * Otherwise, assigns the email to `newUser.nuEmail` and clears any previous error.
 *
 * @async
 * @function isUserExistByEmail
 * @param {string} inEmail - The email address to validate and check for existence.
 * @returns {Promise<boolean>} Resolves to `true` if the email is valid and not taken, otherwise `false`.
 *
 * @throws {Error} Returns `false` in case of any unexpected error during validation or lookup.
 *
 * @see validateEmailFormat - Validates that the email follows a proper format.
 * @see isUserEmailTaken - Checks if an email already exists in storage or database.
 * @see handleErrorSet - Displays or clears error messages for the email field.
 */

async function isUserExistByEmail(inEmail) {
  if (!inEmail || !inEmail.trim()) return false;
  try {
    if (!validateEmailFormat(inEmail)) {
      return false;
    }
    const exists = await isUserEmailTaken(inEmail);
    if (exists) {
      handleErrorSet(
        "in-password",
        "field-email",
        "email-error",
        false,
        "E-Mail already exists!"
      );
      return false;
    }
    newUser.nuEmail = inEmail;
    handleErrorSet("in-password", "field-email", "email-error", true);
    return true;
  } catch (error) {
    console.error("Error validating email:", error);
    handleErrorSet(
      "in-password",
      "field-email",
      "email-error",
      false,
      "Error validating email. Please try again."
    );
    return false;
  }
}

/**
 * Validates that the provided email has a correct format.
 *
 * This function uses a regular expression to check if the email
 * follows a valid structure (e.g., "name@example.com").
 * If the format is invalid, it triggers an error display using `handleErrorSet`.
 *
 * @function validateEmailFormat
 * @param {string} inEmail - The email address to validate.
 * @returns {boolean} Returns `true` if the email format is valid, otherwise `false`.
 *
 * @see handleErrorSet - Displays an error message when the email format is invalid.
 */
function validateEmailFormat(inEmail) {
  // RFC 5322 compliant email regex that handles most valid email formats
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
  if (!emailRegex.test(inEmail)) {
    handleErrorSet(
      "in-password",
      "field-email",
      "email-error",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  }
  return true;
}

/**
 * Checks whether the user has accepted the privacy policy or terms.
 *
 * This function verifies if the checkbox with id "checkBox" is checked.
 * If the user hasn't accepted the terms, it displays an error message using `handleErrorSet`.
 * Otherwise, the acceptance is considered valid.
 *
 * @function checkAcceptTerms
 * @returns {boolean} Returns `true` if the checkbox is checked, otherwise `false`.
 *
 * @see handleErrorSet - Displays an error message if the terms are not accepted.
 */
function checkAcceptTerms() {
  const checkBox = document.getElementById("checkBox");
  if (!checkBox.checked) {
    handleErrorSet(
      "btnSignup",
      "checkBox",
      "checkBoxError",
      false,
      "Please accept the Privacy policy"
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Toggles the state of the terms acceptance checkbox and updates its visual indicator.
 *
 * This function switches the `checked` state of the checkbox with id "checkBox"
 * and updates the associated image "checkBoxImage" to reflect the current state.
 * It also triggers `handleErrorSet` to show or clear error messages depending on whether
 * the user has accepted the privacy policy.
 *
 * @function toggleCheckBox
 *
 * @returns {void} This function does not return a value.
 *
 * @see handleErrorSet - Updates or clears the error message based on the checkbox state.
 */
function toggleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");
  if (checkBox.disabled) return;
  checkBox.checked = !checkBox.checked;
  if (checkBox.checked) {
    checkBox.checked = false;
    checkBoxImage.src = "../assets/icon/sign/checked.svg";
    handleErrorSet("btnSignup", "checkBox", "checkBoxError", true);
  } else {
    checkBoxImage.src = "../assets/icon/sign/unchacked.svg";
    checkBox.checked = true;
    handleErrorSet(
      "btnSignup",
      "checkBox",
      "checkBoxError",
      false,
      "Please accept the Privacy policy"
    );
  }
}

/**
 * Handles setting or clearing error messages and field states in the form.
 *
 * This function updates the visual state of an input field and its related elements:
 * - Changes the border color based on the validation status.
 * - Toggles the visibility or enabled state of the next input element.
 * - Shows or hides the associated error message.
 *
 * @function handleErrorSet
 * @param {string} nextFieldId - The ID of the next input field to toggle.
 * @param {string} fieldId - The ID of the current input field being validated.
 * @param {string} errorId - The ID of the element where the error message is displayed.
 * @param {boolean} status - The validation status; `true` if valid, `false` if invalid.
 * @param {string} [errorMessage=""] - The error message to display if the field is invalid.
 *
 * @returns {void} This function does not return a value.
 *
 * @see removeBorderColor - Removes the border highlight from a valid field.
 * @see setBorderColor - Adds a border highlight for invalid fields.
 * @see toggleNextElement - Enables or disables the next field based on validation.
 * @see toggleErrorMessage - Displays or hides the error message element.
 */
function handleErrorSet(
  nextFieldId,
  fieldId,
  errorId,
  status,
  errorMessage = ""
) {
  if (status) {
    removeBorderColor(fieldId);
  } else {
    setBorderColor(fieldId, false);
  }
  toggleNextElement(nextFieldId, status);
  toggleErrorMessage(errorId, status, errorMessage);
}

/**
 * Shows or hides an error message element based on validation status.
 *
 * This function updates the visibility and content of the specified HTML element:
 * - If `isValid` is `true`, hides the element and clears its content.
 * - If `isValid` is `false`, shows the element and sets its content to the provided message.
 *   If the message contains HTML tags, it sets it as innerHTML; otherwise, as textContent.
 *
 * @function toggleErrorMessage
 * @param {string} elementId - The ID of the HTML element used for displaying the error message.
 * @param {boolean} isValid - Validation status; `true` hides the message, `false` shows it.
 * @param {string} [message=""] - The error message to display if invalid. Supports HTML content.
 *
 * @returns {void} This function does not return a value.
 */
function toggleErrorMessage(elementId, isValid, message = "") {
  const el = document.getElementById(elementId);
  if (!el) return;
  if (isValid) {
    el.classList.add("d-none");
    el.textContent = "";
    el.innerHTML = "";
  } else {
    el.classList.remove("d-none");
    if (elementId === "password-tooltip") {
      el.innerHTML = message;
    } else {
      el.textContent = message;
    }
  }
}

/**
 * Enables or disables the specified HTML element based on validation status.
 *
 * This function updates the `disabled` property of the given element:
 * - If `status` is `true`, the element is enabled.
 * - If `status` is `false`, the element is disabled.
 *
 * @function toggleNextElement
 * @param {string} eleID - The ID of the HTML element to enable or disable.
 * @param {boolean} status - Determines whether the element should be enabled (`true`) or disabled (`false`).
 *
 * @returns {void} This function does not return a value.
 */
function toggleNextElement(eleID, status) {
  const el = document.getElementById(eleID);
  if (!el) return;
  if (status) {
    el.disabled = false;
  } else {
    el.disabled = true;
  }
}

/**
 * Removes validation border styles from the specified input element.
 *
 * This function removes the CSS classes "validInput" and "invalidInput"
 * from the element, effectively clearing any previous visual validation indicators.
 *
 * @function removeBorderColor
 * @param {string} inID - The ID of the input element to clear border styles from.
 *
 * @returns {void} This function does not return a value.
 */
function showSuccessAndRedirect(redirectPath = CONFIG.routes.login) {
  const overlay = document.getElementById("success-overlay");
  if (!overlay) {
    console.error("Success overlay not found");
    window.location.href = redirectPath;
    return;
  }
  overlay.classList.remove("d-none");

  setTimeout(function () {
    window.location.href = redirectPath;
  }, 2000);
}

function removeBorderColor(inID) {
  const feldInput = document.getElementById(inID);
  feldInput.classList.remove("validInput", "invalidInput");
}

/**
 * Sets the validation border style on the specified input element.
 *
 * This function first removes any existing validation classes ("validInput" and "invalidInput"),
 * then applies the appropriate class based on the `status` parameter:
 * - If `status` is `true`, the "validInput" class is added.
 * - If `status` is `false`, the "invalidInput" class is added.
 *
 * @function setBorderColor
 * @param {string} inID - The ID of the input element to apply border styles to.
 * @param {boolean} status - Determines which validation style to apply; `true` for valid, `false` for invalid.
 *
 * @returns {void} This function does not return a value.
 */
function setBorderColor(inID, status) {
  const feldInput = document.getElementById(inID);
  if (!feldInput) {
    console.warn(`setBorderColor: element with id "${inID}" not found.`);
    return;
  }

  feldInput.classList.remove("valid-input", "invalid-input");
  if (status) {
    feldInput.classList.add("valid-input");
  } else {
    feldInput.classList.add("invalid-input");
  }
}

/**
 * Resets an input field's validation state and clears its associated error message.
 *
 * This function sets the input field's border to a valid state and hides any error message
 * associated with it.
 *
 * @function restInputField
 * @param {string} idField - The ID of the input field to reset.
 * @param {string} idMsgError - The ID of the error message element to clear.
 *
 * @returns {void} This function does not return a value.
 *
 * @see setBorderColor - Updates the input field's border style.
 * @see toggleErrorMessage - Hides or clears the error message.
 */
function restInputField(idField, idMsgError) {
  setBorderColor(idField, true);
  toggleErrorMessage(idMsgError, true, "");
}

/**
 * Displays a success overlay and redirects the user to the login page after a short delay.
 *
 * This function shows an overlay element with the ID "successOverlay" by removing the "d-none" class.
 * After 2 seconds, it automatically redirects the user to the login page.
 *
 * @function showSuccessAndRedirect
 *
 * @returns {void} This function does not return a value.
 */
function showSuccessAndRedirect() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 2000);
}

/**
 * Resets an input field's validation state and clears its associated error message.
 *
 * This function sets the input field's border to a valid state and hides any error message
 * associated with it.
 *
 * @function restInputField
 * @param {string} idField - The ID of the input field to reset.
 * @param {string} idMsgError - The ID of the error message element to clear.
 *
 * @returns {void} This function does not return a value.
 *
 * @see setBorderColor - Updates the input field's border style.
 * @see toggleErrorMessage - Hides or clears the error message.
 */
function restInputField(idField, idMsgError) {
  setBorderColor(idField, true);
  toggleErrorMessage(idMsgError, true, "");
}

/**
 * Displays a success overlay and redirects the user to the login page after a short delay.
 *
 * This function shows an overlay element with the ID "successOverlay" by removing the "d-none" class.
 * After 2 seconds, it automatically redirects the user to the login page.
 *
 * @function showSuccessAndRedirect
 *
 * @returns {void} This function does not return a value.
 */
function showSuccessAndRedirect() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 2000);
}}
