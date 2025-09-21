const newUser = [{ nuName: "", nuEmail: "", inPassword: "" }];

async function handleRegisterUser(event) {
  event.preventDefault();
  try {
    await addNewUser(newUser);

    window.location.href = "../html/login.html";
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

async function isUserExistByName(inName) {
  const error = document.getElementById("usernameError");
  const emailField = document.getElementById("inEmail");

  if (!inName) return;

  const exists = await isUserNameTaken(inName);
  if (exists) {
    error.textContent = "Username already exists!";
    error.classList.remove("d-none");
    emailField.disabled = true;
  } else {
    newUser.nuName = inName;
    error.textContent = "";
    error.classList.add("d-none");
    emailField.disabled = false;
    emailField.focus();
  }
}

async function isUserExistByEmail(inEmail) {
  const error = document.getElementById("emailError");
  const passwordField = document.getElementById("inPassword");

  if (!inEmail) return;

  const exists = await isUserEmailTaken(inEmail);
  if (!validateEmailFormat(inEmail)) {
    passwordField.disabled = true;
    return;
  }
  if (exists) {
    error.textContent = "E-Mail already exists!";
    error.classList.remove("d-none");
    passwordField.disabled = true;
  } else {
    newUser.nuEmail = inEmail;
    error.textContent = "";
    error.classList.add("d-none");
    passwordField.disabled = false;
    passwordField.focus();
  }
}

function validateEmailFormat(inEmail) {
  const error = document.getElementById("emailError");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(inEmail)) {
    error.textContent = "Invalid E-Mail format!";
    error.classList.remove("d-none");

    return false;
  } else {
    error.textContent = "";
    error.classList.add("d-none");
    return true;
  }
}

function handleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const btnSignup = document.getElementById("btnSignup");
  const errorMsg = document.getElementById("checkBoxError");

  if (checkBox.checked) {
    btnSignup.disabled = false;
    errorMsg.textContent = "";
    errorMsg.classList.add("d-none");
  } else {
    btnSignup.disabled = true;
    errorMsg.classList.remove("d-none");
    errorMsg.textContent = "Please accept the Privacy policy";
  }
}

// Qw123456

function toggleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");

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

function updateIconByState() {
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

  updateIconByState();

  validatePasswordTooltip(realPassword);
}

function onPasswordIconClick() {
  const input = document.getElementById("inPassword");
  if (realPassword.length === 0) return;

  isVisible = !isVisible;
  input.value = isVisible ? realPassword : "*".repeat(realPassword.length);

  updateIconByState();
}

let realPassword = "";
let isVisible = false;

let realConfirmPassword = "";
let confirmVisible = false;

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

function onConfirmPasswordInput(event) {
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

function onConfirmPasswordIconClick() {
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
  } else {
    error.textContent = "Password not Matched!";
    error.classList.remove("d-none");

    checkBox.disabled = true;
    checkBox.checked = false;
  }
}
// Qw123456

function validatePasswordTooltip(inPassword) {
  const tooltip = document.getElementById("passwordTooltip");
  const confirmField = document.getElementById("inPasswordConfirm");

  const rules = checkPasswordRules(inPassword);
  tooltip.innerHTML = buildPasswordMessage(rules);
  tooltip.style.display = inPassword ? "block" : "none";

  if (isPasswordValid(rules)) {
    tooltip.classList.add("d-none");
    newUser.nuPassword = inPassword;
    confirmField.disabled = false;
  } else {
    tooltip.classList.remove("d-none");
    confirmField.disabled = true;
  }
}

function isPasswordValid(rules) {
  return rules.minLength && rules.hasLower && rules.hasNumber;
}

function buildPasswordMessage(rules) {
  let message = "";

  message += `<span class="${rules.minLength ? "valid" : "invalid"}">
                ${rules.minLength ? "✔" : "❌"} At least 8 characters
              </span><br>`;

  message += `<span class="${rules.hasLower ? "valid" : "invalid"}">
                ${rules.hasLower ? "✔" : "❌"} At least one lowercase letter
              </span><br>`;
  message += `<span class="${rules.hasNumber ? "valid" : "invalid"}">
                ${rules.hasNumber ? "✔" : "❌"} At least one number
              </span><br>`;

  return message;
}

function checkPasswordRules(password) {
  return {
    minLength: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
}
