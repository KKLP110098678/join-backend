let realPassword = "";
let isVisible = false;

let realConfirmPassword = "";
let confirmVisible = false;

function onPasswordInput(event) {
  const input = event.target;
  const value = input.value;

  if (value.length > realPassword.length) {
    const added = value.slice(realPassword.length);
    realPassword += added;
  } else if (value.length < realPassword.length) {
    realPassword = realPassword.slice(0, value.length);
  }

  input.value = isVisible ? realPassword : "*".repeat(realPassword.length);

  toggleVisibilityIcon();
  setBorderColor("fieldPassword", false);
  validatePasswordTooltip(realPassword);
}

function toggleVisibilityIcon() {
  const icon = document.getElementById("passwordIcon");
  if (realPassword.length === 0) {
    icon.src = "../assets/icon/sign/lock.svg";
    isVisible = false;
  } else {
    icon.src = isVisible
      ? "../assets/icon/sign/visibility.svg"
      : "../assets/icon/sign/visibility_off.svg";
  }
}

function onPasswordIconClick() {
  const input = document.getElementById("inPassword");
  if (realPassword.length === 0) return;

  isVisible = !isVisible;
  input.value = isVisible ? realPassword : "*".repeat(realPassword.length);

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

function onInputConfirmPassword(event) {
  const input = event.target;
  const value = input.value;
  if (value.length > realConfirmPassword.length) {
    const added = value.slice(realConfirmPassword.length);
    realConfirmPassword += added;
  } else if (value.length < realConfirmPassword.length) {
    realConfirmPassword = realConfirmPassword.slice(0, value.length);
  }
  input.value = confirmVisible
    ? realConfirmPassword
    : "*".repeat(realConfirmPassword.length);
  updateConfirmIconByState();
  isPasswordMatching(realConfirmPassword);
}

function onClickConfirmPasswordIcon() {
  const input = document.getElementById("inPasswordConfirm");
  if (realConfirmPassword.length === 0) return;
  confirmVisible = !confirmVisible;
  input.value = confirmVisible
    ? realConfirmPassword
    : "*".repeat(realConfirmPassword.length);
  updateConfirmIconByState();
}

// Qw123456
function isPasswordMatching(confirmPassword) {
  const checkBox = document.getElementById("checkBox");
  const error = document.getElementById("confirmPassword");
  if (!confirmPassword) return;

  if (newUser.nuPassword === confirmPassword) {
    error.textContent = "";
    error.classList.add("d-none");
    checkBox.disabled = false;
    checkBox.checked = false;
    removeBorderColor("fieldPasswordConfirm");
  } else {
    error.textContent = "Password not Matched!";
    error.classList.remove("d-none");
    setBorderColor("fieldPasswordConfirm", false);

    checkBox.disabled = true;
    checkBox.checked = false;
  }
}
// Qw123456

function validatePasswordTooltip(inPassword) {
  const rules = checkPasswordRules(inPassword);
  const msg = buildPasswordMessage(rules);
  handleErrorSet(
    "",
    "fieldPassword",
    "passwordTooltip",
    isPasswordValid(rules),
    isPasswordValid(rules) ? "" : msg
  );
}

function onPasswordBlur(inPassword) {
  if (isPasswordValid(checkPasswordRules(inPassword))) {
    newUser.nuPassword = inPassword;
    handleErrorSet(
      "inPasswordConfirm",
      "fieldPassword",
      "passwordTooltip",
      true
    );
  } else {
    handleErrorSet(
      "inPasswordConfirm",
      "fieldPassword",
      "passwordTooltip",
      false
    );
  }
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
