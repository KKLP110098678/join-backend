let objToFind = { email: "", password: "" };

function getEmail(inEmail) {
  if (validateEmailFormat(inEmail)) {
    objToFind.email = inEmail;
    handleErrorSet("inPassword", "fieldEmail", "emailError", true);
    return true;
  }
}

function getPassword(inPassword) {
  realPassword = updateVarible(inPassword, realPassword);
  objToFind.password = realPassword;
  handleErrorSet("checkBox", "fieldPassword", "passwordTooltip", true);
}

function checkCardinal() {
  if (objToFind.email === "") {
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  } else if (objToFind.password === "") {
    toggleErrorMessage(
      "passwordTooltip",
      false,
      "Please enter a valid password!"
    );
    setBorderColor("fieldPassword", false);
    return false;
  } else {
    toggleErrorMessage("passwordTooltip", true, "");
    return true;
  }
}

function passwordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  restInputField("fieldPassword", "passwordTooltip");
  objToFind.password = realPassword;
}

async function handelLogIn() {
  if (checkCardinal()) {
    const user = await findUserByCardinal(objToFind);

    if (user) {
      updateCurrentUser(user);
      window.location.href = "../html/summary.html";
    } else {
      console.log("it not found");
      handleWrongCardinal();
    }
  }
}

function handleWrongCardinal() {
  const message = "Check your email and password. Please try again.";
  setBorderColor("fieldEmail", false);
  setBorderColor("fieldPassword", false);
  toggleErrorMessage("passwordTooltip", false, message);
}

function toggleRememberMe() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");
  if (realPassword === "") {
    return;
  }
  if (checkBox.disabled) return;
  checkBox.checked = !checkBox.checked;
  if (checkBox.checked) {
    checkBox.checked = false;
    checkBoxImage.src = "../assets/icon/sign/checked.svg";
  } else {
    checkBoxImage.src = "../assets/icon/sign/unchacked.svg";
    checkBox.checked = true;
  }
}

/**
 * Sets session data for a guest user
 * Stores predefined guest credentials in SessionStorage
 * Called when the user clicks on "Guest log in"
 *
 * @function setGuestSession
 * @returns {void}
 *
 * @example
 * // Triggered by onclick event in HTML
 * setGuestSession();
 */
function setGuestSession() {
  sessionStorage.setItem("userEmail", "guest@join.com");
  sessionStorage.setItem("userId", "guest");
  sessionStorage.setItem("userName", "Guest");
  sessionStorage.setItem("isLoggedIn", "true");
  sessionStorage.setItem("isGuest", "true");
  window.location.href = "../html/summary.html";
}
