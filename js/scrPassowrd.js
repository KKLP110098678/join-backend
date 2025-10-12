let realPassword = "";
let passeordVisible = false;

let realConfirmPassword = "";
let confirmVisible = false;


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

function onPasswordIconClick() {
  const input = document.getElementById("inPassword");
  if (realPassword.length === 0) return;

  passeordVisible = !passeordVisible;
  // input.value = passeordVisible ? realPassword : "*".repeat(realPassword.length);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
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
  updateConfirmIconByState();
  realConfirmPassword = updateVarible(inConfirmWord, realConfirmPassword);
  confirmVisible = hedienWord(input, confirmVisible, realConfirmPassword);
}

function onClickConfirmPasswordIcon() {
  const input = document.getElementById("inPasswordConfirm");
  confirmVisible = !confirmVisible;
  updateConfirmIconByState();
  confirmVisible = hedienWord(input, confirmVisible, realConfirmPassword);
}

// Qw123456
function isPasswordMatching(confirmPassword) {
  const checkBox = document.getElementById("checkBox");
  const error = document.getElementById("confirmPassword");
  if (!confirmPassword) return;
  console.log(realPassword, confirmPassword);

  if (realPassword === confirmPassword) {
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

function updateVarible(inWord, realVar) {
  if (inWord.length > realVar.length) {
    const added = inWord.slice(realVar.length);
    realVar += added;
  } else if (inWord.length < realVar.length) {
    realVar = realVar.slice(0, inWord.length);
  }
  return realVar;
}

function hedienWord(inWord, isVisible, realWord) {
  if (realWord.length === 0) return isVisible;
  inWord.value = isVisible ? realWord : "*".repeat(realWord.length);
  return isVisible;
}

function onPasswordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  setBorderColor("fieldPassword", false);
  validatePasswordTooltip(realPassword);
}

function onPasswordBlur(inPassword) {
  if (checkPasswordRules(inPassword)) {
    newUser.nuPassword = inPassword;
    handleErrorSet("inPasswordConfirm", "inPassword", "passwordTooltip", true);
    console.log("Ja valid");
  } else {
    handleErrorSet("inPasswordConfirm", "inPassword", "passwordTooltip", false);
    console.log("not valid");
  }
}
function validatePasswordTooltip(inPassword) {
  toggleVisibilityIcon();
  const rules = checkPasswordRules(inPassword);
  const msg = buildPasswordMessage(rules);
  handleErrorSet(
    "inPasswordConfirm",
    "fieldPassword",
    "passwordTooltip",
    (isPasswordValid(rules)),
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
