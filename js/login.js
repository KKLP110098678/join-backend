/**
 * Processes and validates an email input.
 *
 * This function checks if the provided email is in a valid format using `validateEmailFormat`.
 * If valid, it stores the email in `objToFind.email` and clears any error message.
 *
 * @function getEmail
 * @param {string} inEmail - The email input to validate and store.
 * @returns {boolean|undefined} Returns `true` if the email is valid; otherwise `undefined`.
 *
 * @see validateEmailFormat - Validates the email format.
 * @see handleErrorSet - Clears or sets error messages for the email field.
 */
function getEmail(inEmail) {
  if (validateEmailFormat(inEmail)) {
    objToFind.email = inEmail;
    handleErrorSet("in-password", "field-email", "email-error", true);
    return true;
  }
}

/**
 * Processes and updates the main password input.
 *
 * This function updates the internal `realPassword` variable using `updateVarible`,
 * stores it in `objToFind.password`, and clears any related error message.
 *
 * @function getPassword
 * @param {string} inPassword - The password input to process and store.
 * @returns {void} This function does not return a value.
 *
 * @see updateVarible - Updates the stored password variable based on input changes.
 * @see handleErrorSet - Clears or sets error messages for the password field.
 */
function getPassword(inPassword) {
  realPassword = updateVarible(inPassword, realPassword);
  objToFind.password = realPassword;
  handleErrorSet("checkBox", "field-password", "passwor-tooltip", true);
}

/**
 * Handles user input for the main password field.
 *
 * This function updates the internal `realPassword` variable, manages password visibility
 * using `hedienWord`, updates the visibility icon, resets the input field state,
 * and stores the password in `objToFind.password`.
 *
 * @function passwordInput
 * @param {HTMLInputElement} input - The password input element being typed into.
 * @returns {void} This function does not return a value.
 *
 * @see updateVarible - Updates the stored password variable based on input changes.
 * @see hedienWord - Toggles masking of the password input.
 * @see toggleVisibilityIcon - Updates the password visibility icon.
 * @see restInputField - Resets the input field border and error message.
 */
function passwordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  restInputField("field-password", "passwor-tooltip");
  objToFind.password = realPassword;
}

/**
 * Handles the login process for a user.
 *
 * This asynchronous function first validates required input fields using `checkCardinal`.
 * If validation passes, it attempts to find the user via `findUserByCardinal`.
 * - If a user is found, it updates the current user state (optionally remembering them)
 *   and redirects to the summary page.
 * - If no user is found, it triggers `handleWrongCardinal` and toggles the "Remember Me" state.
 *
 * @function handelLogIn
 * @returns {Promise<void>} This function does not return a value.
 *
 * @see checkCardinal - Validates the required input fields.
 * @see findUserByCardinal - Searches for the user in the database/storage.
 * @see updateCurrentUser - Updates the current user state and optionally stores them in localStorage.
 * @see handleWrongCardinal - Handles the case when the login credentials are incorrect.
 * @see toggleRememberMe - Toggles the "Remember Me" checkbox state.
 */
async function handelLogIn() {
  if (checkCardinal()) {
    const user = await findUserByCardinal(objToFind);

    if (user) {
      updateCurrentUser(user, rememberMe);
      window.location.href = "../html/summary.html";
    } else {
      handleWrongCardinal();
      toggleRememberMe();
    }
  }
}

/**
 * Validates that the required login credentials are provided.
 *
 * This function checks if `objToFind.email` and `objToFind.password` are non-empty.
 * - If the email is empty, it sets an error message and returns false.
 * - If the password is empty, it sets an error message, updates the input border, and returns false.
 * - If both fields are filled, it clears any password error message and returns true.
 *
 * @function checkCardinal
 * @returns {boolean} Returns `true` if both email and password are provided, otherwise `false`.
 *
 * @see handleErrorSet - Displays or clears error messages for the email field.
 * @see toggleErrorMessage - Displays or clears error messages for the password field.
 * @see setBorderColor - Updates the input field border style for validation feedback.
 */
function checkCardinal() {
  if (objToFind.email === "") {
    handleErrorSet(
      "in-password",
      "field-email",
      "email-error",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  } else if (objToFind.password === "") {
    toggleErrorMessage(
      "passwor-tooltip",
      false,
      "Please enter a valid password!"
    );
    setBorderColor("field-password", false);
    return false;
  } else {
    toggleErrorMessage("passwor-tooltip", true, "");
    return true;
  }
}

/**
 * Handles the scenario when login credentials are incorrect.
 *
 * This function updates the email and password input borders to indicate an error,
 * and displays an error message in the password tooltip area.
 *
 * @function handleWrongCardinal
 * @returns {void} This function does not return a value.
 *
 * @see setBorderColor - Updates input field borders for validation feedback.
 * @see toggleErrorMessage - Displays the error message for incorrect credentials.
 */
function handleWrongCardinal() {
  const message = "Check your email and password. Please try again.";
  setBorderColor("field-email", false);
  setBorderColor("field-password", false);
  toggleErrorMessage("passwor-tooltip", false, message);
}

/**
 * Toggles the "Remember Me" checkbox state for login.
 *
 * This function updates the `rememberMe` variable, the checkbox's `checked` property,
 * and the corresponding icon image based on the current state.
 * It does nothing if the password is empty or the checkbox is disabled.
 *
 * @function toggleRememberMe
 * @returns {void} This function does not return a value.
 */
function toggleRememberMe() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");

  if (realPassword === "") return;
  if (checkBox.disabled) return;
  rememberMe = !rememberMe;

  checkBox.checked = rememberMe;
  checkBoxImage.src = rememberMe
    ? "../assets/icon/sign/checked.svg"
    : "../assets/icon/sign/unchacked.svg";
}

/**
 * Enables and checks the "Remember Me" checkbox.
 *
 * This function sets the checkbox to checked, enables it if it was disabled,
 * and updates the corresponding icon image to indicate it is checked.
 *
 * @function setRememberMe
 * @returns {void} This function does not return a value.
 */
function setRememberMe() {
  const chBox = document.getElementById("checkBox");
  chBox.checked = true;
  chBox.disabled = false;
  const checkBoxImage = document.getElementById("checkBoxImage");
  checkBoxImage.src = "../assets/icon/sign/checked.svg";
}

/**
 * Sets a guest user session and redirects to the summary page.
 *
 * This function removes any existing `currentUser` from sessionStorage,
 * creates a guest user object with default properties, stores it in sessionStorage,
 * and redirects the user to the summary page.
 *
 * @function setGuestSession
 * @returns {void} This function does not return a value.
 */
function setGuestSession() {
  sessionStorage.removeItem("currentUser");
  const guestUser = {
    userEmail: "guest@join.com",
    userId: "guest",
    userName: "Guest",
    isLoggedIn: false,
    isGuest: true,
  };

  sessionStorage.setItem("currentUser", JSON.stringify(guestUser));

  window.location.href = "../html/summary.html";
}
