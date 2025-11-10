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
      updateCurrentUser(user, rememberMe);
      window.location.href = "../html/summary.html";
    } else {
      handleWrongCardinal();
      toggleRememberMe();
    }
  }
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

function handleWrongCardinal() {
  const message = "Check your email and password. Please try again.";
  setBorderColor("fieldEmail", false);
  setBorderColor("fieldPassword", false);
  toggleErrorMessage("passwordTooltip", false, message);
}

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

function setRememberMe() {
  const chBox = document.getElementById("checkBox");
  chBox.checked = true;
  chBox.disabled = false;
  const checkBoxImage = document.getElementById("checkBoxImage");
  checkBoxImage.src = "../assets/icon/sign/checked.svg";
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
