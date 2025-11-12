/**
 * Stores the actual password entered by the user.
 * Used for validation and toggling visibility in the password input field.
 * @type {string}
 */
let realPassword = "";

/**
 * Indicates whether the password input field is currently visible (plain text) or hidden (masked).
 * @type {boolean}
 */
let passeordVisible = false;

/**
 * Stores the actual confirmation password entered by the user.
 * Used for validation and toggling visibility in the confirm password input field.
 * @type {string}
 */
let realConfirmPassword = "";

/**
 * Indicates whether the confirmation password input field is currently visible (plain text) or hidden (masked).
 * @type {boolean}
 */
let confirmVisible = false;

/**
 * Validates the password input field in the registration form.
 *
 * This function checks if the password stored in `newUser.nuPassword` is empty.
 * If the password is empty, it displays an error message using `handleErrorSet`.
 * Otherwise, the password is considered valid.
 *
 * @function checkInputPassword
 * @returns {boolean} Returns `true` if the password is not empty, otherwise `false`.
 *
 * @see handleErrorSet - Displays or clears an error message for the password field.
 */
function checkInputPassword() {
  if (newUser.nuPassword === "") {
    handleErrorSet(
      "inPasswordConfirm",
      "field-password",
      "passwordTooltip",
      false,
      "Please enter a valid Password!"
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Handles password input events in the registration form.
 *
 * This function updates the internal `realPassword` variable with the current input value,
 * manages password visibility using `hedienWord`, updates the visibility icon,
 * sets the input field border style, and validates the password tooltip.
 *
 * @function onPasswordInput
 * @param {HTMLInputElement} input - The password input element being typed into.
 * @returns {void} This function does not return a value.
 *
 * @see updateVarible - Updates the stored password variable.
 * @see hedienWord - Toggles masking of the password input.
 * @see toggleVisibilityIcon - Updates the password visibility icon.
 * @see setBorderColor - Sets the input field's border style.
 * @see validatePasswordTooltip - Validates and updates the password tooltip message.
 */
function onPasswordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  setBorderColor("field-password", false);
  validatePasswordTooltip(realPassword);
}

/**
 * Handles password input blur events in the registration form.
 *
 * This function checks the entered password against validation rules using `checkPasswordRules`.
 * If the password is valid, it updates `newUser.nuPassword`, clears error messages, and removes the input border color.
 * If invalid, it sets the error state using `handleErrorSet`.
 *
 * @function onPasswordBlur
 * @returns {void} This function does not return a value.
 *
 * @see checkPasswordRules - Checks the password against defined validation rules.
 * @see isPasswordValid - Determines if the password meets all required rules.
 * @see handleErrorSet - Displays or clears error messages related to the password field.
 * @see removeBorderColor - Clears the validation border styling for the password field.
 */
function onPasswordBlur() {
  const rules = checkPasswordRules(realPassword);
  if (isPasswordValid(rules)) {
    newUser.nuPassword = realPassword;
    handleErrorSet("inPasswordConfirm", "in-password", "passwordTooltip", true);
    removeBorderColor("field-password");
  } else {
    handleErrorSet(
      "inPasswordConfirm",
      "in-password",
      "passwordTooltip",
      false
    );
  }
}

/**
 * Toggles the visibility of the password input field when the visibility icon is clicked.
 *
 * This function switches the `passeordVisible` state, updates the input masking
 * using `hedienWord`, and updates the visibility icon accordingly.
 *
 * @function onPasswordIconClick
 * @returns {void} This function does not return a value.
 *
 * @see hedienWord - Toggles masking of the password input field.
 * @see toggleVisibilityIcon - Updates the visibility icon for the password field.
 */
function onPasswordIconClick() {
  const input = document.getElementById("in-password");
  if (realPassword.length === 0) return;
  passeordVisible = !passeordVisible;
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
}

/**
 * Updates the password visibility icon based on the current state of the password input.
 *
 * If no password is entered, the icon shows a lock and sets `passeordVisible` to false.
 * Otherwise, it switches between "visibility" and "visibility_off" icons depending on `passeordVisible`.
 *
 * @function toggleVisibilityIcon
 * @returns {void} This function does not return a value.
 */
function toggleVisibilityIcon() {
  const icon = document.getElementById("passwordIcon");
  if (realPassword.length === 0) {
    icon.src = "../assets/icon/sign/lock.svg";
    passeordVisible = false;
  } else {
    icon.src = passeordVisible
      ? "../assets/icon/sign/visibility.svg"
      : "../assets/icon/sign/visibility_off.svg";
  }
}

/**
 * Validates the confirmation password input field in the registration form.
 *
 * This function checks if `realConfirmPassword` is empty.
 * If empty, it displays an error message using `handleErrorSet`.
 * Otherwise, the confirmation password is considered valid.
 *
 * @function checkInputConfirmPassword
 * @returns {boolean} Returns `true` if the confirmation password is not empty, otherwise `false`.
 *
 * @see handleErrorSet - Displays or clears an error message for the confirmation password field.
 */
function checkInputConfirmPassword() {
  if (realConfirmPassword === "") {
    handleErrorSet(
      "checkBox",
      "fieldPasswordConfirm",
      "confirmPassword",
      false,
      "Please Enter a valid confirm Password."
    );
    return false;
  } else {
    return true;
  }
}

/**
 * Handles input events for the confirmation password field.
 *
 * This function resets the input field state, updates the internal `realConfirmPassword` variable,
 * manages visibility using `hedienWord`, and updates the confirmation visibility icon accordingly.
 *
 * @function onInputConfirmPassword
 * @param {HTMLInputElement} input - The confirmation password input element being typed into.
 * @returns {void} This function does not return a value.
 *
 * @see restInputField - Resets the input field border and error message.
 * @see updateVarible - Updates the stored confirmation password variable.
 * @see hedienWord - Toggles masking of the confirmation password input.
 * @see updateConfirmIconByState - Updates the visibility icon for the confirmation password field.
 */
function onInputConfirmPassword(input) {
  restInputField("fieldPasswordConfirm", "confirmPassword");
  const inConfirmWord = input.value;
  realConfirmPassword = updateVarible(inConfirmWord, realConfirmPassword);
  confirmVisible = hedienWord(input, confirmVisible, realConfirmPassword);
  updateConfirmIconByState();
}

/**
 * Toggles the visibility of the confirmation password input field when the visibility icon is clicked.
 *
 * This function switches the `confirmVisible` state, updates the input masking
 * using `hedienWord`, and updates the visibility icon accordingly.
 *
 * @function onClickConfirmPasswordIcon
 * @returns {void} This function does not return a value.
 *
 * @see hedienWord - Toggles masking of the confirmation password input field.
 * @see updateConfirmIconByState - Updates the visibility icon for the confirmation password field.
 */
function onClickConfirmPasswordIcon() {
  const input = document.getElementById("inPasswordConfirm");
  confirmVisible = !confirmVisible;
  updateConfirmIconByState();
  confirmVisible = hedienWord(input, confirmVisible, realConfirmPassword);
}

/**
 * Updates the confirmation password visibility icon based on the current state of the input.
 *
 * If no confirmation password is entered, the icon shows a lock and sets `confirmVisible` to false.
 * Otherwise, it switches between "visibility" and "visibility_off" icons depending on `confirmVisible`.
 *
 * @function updateConfirmIconByState
 * @returns {void} This function does not return a value.
 */
function updateConfirmIconByState() {
  const icon = document.getElementById("confirmPasswordIcon");
  if (realConfirmPassword.length === 0) {
    icon.src = "../assets/icon/sign/lock.svg";
    confirmVisible = false;
  } else {
    icon.src = confirmVisible
      ? "../assets/icon/sign/visibility.svg"
      : "../assets/icon/sign/visibility_off.svg";
  }
}

/**
 * Checks if the confirmation password matches the main password.
 *
 * This function compares `realPassword` and `realConfirmPassword`.
 * If they match, it clears any error message for the confirmation field.
 * If they do not match, it sets an error message using `handleErrorSet`.
 *
 * @function isPasswordMatching
 * @returns {void} This function does not return a value.
 *
 * @see handleErrorSet - Displays or clears the error message for the confirmation password field.
 */
function isPasswordMatching() {
  if (!realConfirmPassword) return;
  if (realPassword === realConfirmPassword) {
    handleErrorSet("checkBox", "fieldPasswordConfirm", "confirmPassword", true);
  } else {
    handleErrorSet(
      "checkBox",
      "fieldPasswordConfirm",
      "confirmPassword",
      false,
      "Your passwords don't match. Please try again."
    );
  }
}

/**
 * Updates a stored string variable based on the current input value.
 *
 * This function compares the new input `inWord` with the existing `realVar`:
 * - If characters were added, it appends the new portion to `realVar`.
 * - If characters were removed, it slices `realVar` to match the new length.
 *
 * @function updateVarible
 * @param {string} inWord - The current input string.
 * @param {string} realVar - The stored string variable to update.
 * @returns {string} The updated string reflecting the changes from `inWord`.
 */
function updateVarible(inWord, realVar) {
  if (inWord.length > realVar.length) {
    const added = inWord.slice(realVar.length);
    realVar += added;
  } else if (inWord.length < realVar.length) {
    realVar = realVar.slice(0, inWord.length);
  }
  return realVar;
}

/**
 * Masks or reveals the input field value based on visibility state.
 *
 * This function updates the input element `inWord`:
 * - If `isVisible` is true, the actual `realWord` is shown.
 * - If `isVisible` is false, the input is masked with asterisks.
 * Returns the current visibility state.
 *
 * @function hedienWord
 * @param {HTMLInputElement} inWord - The input element to update.
 * @param {boolean} isVisible - Current visibility state of the input.
 * @param {string} realWord - The actual value to show or mask.
 * @returns {boolean} Returns the visibility state (`isVisible`).
 */
function hedienWord(inWord, isVisible, realWord) {
  if (realWord.length === 0) return isVisible;
  inWord.value = isVisible ? realWord : "*".repeat(realWord.length);
  return isVisible;
}

/**
 * Checks a password against predefined validation rules.
 *
 * This function returns an object indicating whether the password meets each rule:
 * - `minLength`: true if password length is greater than 7.
 * - `hasLower`: true if password contains at least one lowercase letter.
 * - `hasNumber`: true if password contains at least one numeric digit.
 *
 * @function checkPasswordRules
 * @param {string} password - The password to validate.
 * @returns {Object} An object with boolean properties: `minLength`, `hasLower`, and `hasNumber`.
 */
function checkPasswordRules(password) {
  return {
    minLength: password.length > 7,
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
}

/**
 * Validates the password and updates the tooltip message accordingly.
 *
 * This function checks the password against validation rules using `checkPasswordRules`,
 * builds a message with `buildPasswordMessage`, and updates the tooltip and input field styling
 * using `handleErrorSet` and `setBorderColor`. It also updates the visibility icon.
 *
 * @function validatePasswordTooltip
 * @param {string} inPassword - The password input to validate.
 * @returns {void} This function does not return a value.
 *
 * @see toggleVisibilityIcon - Updates the password visibility icon.
 * @see checkPasswordRules - Checks the password against defined validation rules.
 * @see buildPasswordMessage - Builds a message summarizing password validation results.
 * @see handleErrorSet - Displays or clears error messages and updates field state.
 * @see setBorderColor - Updates the input field border style based on validation.
 */
function validatePasswordTooltip(inPassword) {
  toggleVisibilityIcon();
  const rules = checkPasswordRules(inPassword);
  const msg = buildPasswordMessage(rules);
  handleErrorSet(
    "inPasswordConfirm",
    "field-password",
    "passwordTooltip",
    isPasswordValid(rules),
    msg
  );
  if (isPasswordValid(rules)) {
    setBorderColor("field-password", true);
  }
}

/**
 * Determines if a password passes all validation rules.
 *
 * This function evaluates the boolean properties of the `rules` object:
 * - `minLength`: password length is sufficient.
 * - `hasLower`: contains at least one lowercase letter.
 * - `hasNumber`: contains at least one numeric digit.
 *
 * @function isPasswordValid
 * @param {Object} rules - An object containing boolean validation results.
 * @param {boolean} rules.minLength - True if password length is sufficient.
 * @param {boolean} rules.hasLower - True if password contains a lowercase letter.
 * @param {boolean} rules.hasNumber - True if password contains a number.
 * @returns {boolean} Returns `true` if all rules are satisfied, otherwise `false`.
 */
function isPasswordValid(rules) {
  return rules.minLength && rules.hasLower && rules.hasNumber;
}

/**
 * Builds an HTML-formatted password validation message based on rule checks.
 *
 * This function generates a message indicating which password rules are met or not:
 * - "At least 8 characters"
 * - "At least one lowercase letter"
 * - "At least one number"
 * Each rule is wrapped in a span with class "valid" or "invalid" depending on the result.
 *
 * @function buildPasswordMessage
 * @param {Object} rules - An object containing boolean validation results.
 * @param {boolean} rules.minLength - True if password length is sufficient.
 * @param {boolean} rules.hasLower - True if password contains a lowercase letter.
 * @param {boolean} rules.hasNumber - True if password contains a number.
 * @returns {string} HTML string representing the password validation message.
 */
function buildPasswordMessage(rules) {
  let message = "";
  message += `<span class="${rules.minLength ? "valid" : "invalid"}">
                At least 8 characters
              </span><br>`;
  message += `<span class="${rules.hasLower ? "valid" : "invalid"}">
                At least one lowercase letter
              </span><br>`;
  message += `<span class="${rules.hasNumber ? "valid" : "invalid"}">
                At least one number
              </span><br>`;
  return message;
}
