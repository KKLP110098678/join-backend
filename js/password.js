let realPassword = "";
let passwordVisible = false;

let realConfirmPassword = "";
let confirmVisible = false;

function toggleVisibilityIcon() {
  const icon = document.getElementById("passwordIcon");
  if (realPassword.length === 0) {
    icon.src = "../assets/icon/sign/lock.svg";
    passwordVisible = false;
  } else {
    icon.src = passwordVisible
      ? "../assets/icon/sign/visibility.svg"
      : "../assets/icon/sign/visibility_off.svg";
  }
}

function onPasswordIconClick() {
  const input = document.getElementById("inPassword");
  if (realPassword.length === 0) return;

  passwordVisible = !passwordVisible;
  hideWord(input, passwordVisible, realPassword);
  toggleVisibilityIcon();
}

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

function onInputConfirmPassword(input) {
  const inConfirmWord = input.value;
  realConfirmPassword = updateVariable(inConfirmWord, realConfirmPassword);
  hideWord(input, confirmVisible, realConfirmPassword);
  updateConfirmIconByState();
}

function onClickConfirmPasswordIcon() {
  const input = document.getElementById("inPasswordConfirm");
  confirmVisible = !confirmVisible;
  updateConfirmIconByState();
  hideWord(input, confirmVisible, realConfirmPassword);
}

function isPasswordMatching() {
  if (!realConfirmPassword) return;
  if (realPassword === realConfirmPassword) {
    handleErrorSet(
      "privacy-checkbox",
      "fieldPasswordConfirm",
      "confirmPassword",
      true
    );
  } else {
    handleErrorSet(
      "privacy-checkbox",
      "fieldPasswordConfirm",
      "confirmPassword",
      false,
      "Passwords do not match!"
    );
  }
}
function updateVariable(inWord, realVar) {
  if (inWord.length > realVar.length) {
    const added = inWord.slice(realVar.length);
    realVar += added;
  } else if (inWord.length < realVar.length) {
    realVar = realVar.slice(0, inWord.length);
  }
  return realVar;
}

function hideWord(inWord, isVisible, realWord) {
  if (realWord.length === 0) return isVisible;
  inWord.value = isVisible ? realWord : "*".repeat(realWord.length);
  return isVisible;
}

function onPasswordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVariable(inPassWord, realPassword);
  hideWord(input, passwordVisible, realPassword);
  toggleVisibilityIcon();
  setBorderColor("fieldPassword", false);
  validatePasswordTooltip(realPassword);
}

function onPasswordBlur(inPassword, userObject, password) {
  if (checkPasswordRules(inPassword)) {
    if (userObject) {
      userObject.nuPassword = password;
    }
    handleErrorSet("inPasswordConfirm", "inPassword", "passwordTooltip", true);
  } else {
    handleErrorSet("inPasswordConfirm", "inPassword", "passwordTooltip", false);
  }
}

function validatePasswordTooltip(inPassword) {
  const rules = checkPasswordRules(inPassword);
  const msg = buildPasswordMessage(rules);
  handleErrorSet(
    "inPasswordConfirm",
    "fieldPassword",
    "passwordTooltip",
    isPasswordValid(rules),
    isPasswordValid(rules) ? "" : msg
  );
}

function isPasswordValid(rules) {
  return rules.minLength && rules.hasLower && rules.hasNumber;
}

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

function checkPasswordRules(password) {
  return {
    minLength: password.length > 7,
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
}
