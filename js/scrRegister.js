const newUser = [{ nuName: "", nuEmail: "", inPassword: "" }];

async function handleRegisterUser() {
  try {
    await addNewUser(newUser);
    showSuccessAndRedirect();
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

async function isUserExistByName(inName) {
  if (!inName || !inName.trim()) return false;
  const exists = await isUserNameTaken(inName);
  if (exists) {
    setBorderColor("fieldName", false);
    toggleNextElement("inEmail", false);
    toggleErrorMessage("usernameError", false, "Username already exists!");
  } else {
    newUser.nuName = inName;
    removeBorderColor("fieldName");
    toggleNextElement("inEmail", true);
    toggleErrorMessage("usernameError", true);
  }
}

function toggleErrorMessage(elementId, isValid, message = "") {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (isValid) {
    el.classList.add("d-none");
    el.textContent = "";
  } else {
    el.classList.remove("d-none");
    el.textContent = message;
  }
}
function toggleNextElement(eleID, status) {
  const el = document.getElementById(eleID);
  if (!el) return;
  if (status) {
    el.disabled = false;
    el.focus();
  } else {
    el.disabled = true;
  }
}

async function isUserExistByEmail(inEmail) {
  const error = document.getElementById("emailError");
  const passwordField = document.getElementById("inPassword");

  if (!inEmail) return;

  const exists = await isUserEmailTaken(inEmail);
  if (!validateEmailFormat(inEmail)) {
    setBorderColor("fieldEmail", false);
    passwordField.disabled = true;
    return;
  }
  if (exists) {
    error.textContent = "E-Mail already exists!";
    error.classList.remove("d-none");
    passwordField.disabled = true;
    setBorderColor("fieldEmail", false);
  } else {
    removeBorderColor("fieldEmail");
    newUser.nuEmail = inEmail;
    error.textContent = "";
    error.classList.add("d-none");
    passwordField.disabled = false;
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

// Qw123456
function showSuccessAndRedirect() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 2000);
}

function removeBorderColor(inID) {
  const feldInput = document.getElementById(inID);
  feldInput.classList.remove("validInput", "invalidInput");
}

function setBorderColor(inID, status) {
  const feldInput = document.getElementById(inID);
  feldInput.classList.remove("validInput", "invalidInput");

  if (status) {
    feldInput.classList.add("validInput");
  } else {
    console.log("true fun");
    feldInput.classList.add("invalidInput");
  }
}

function toggleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");
  const btnSignup = document.getElementById("btnSignup");
  const errorMsg = document.getElementById("checkBoxError");

  if (checkBox.disabled) return;

  checkBox.checked = !checkBox.checked;

  if (checkBox.checked) {
    checkBox.checked = false;
    checkBoxImage.src = "../assets/icon/sign/checked.svg";
    errorMsg.textContent = "";
    errorMsg.classList.add("d-none");
  } else {
    checkBoxImage.src = "../assets/icon/sign/unchacked.svg";
    checkBox.checked = true;
    errorMsg.classList.remove("d-none");
    errorMsg.textContent = "Please accept the Privacy policy";
  }
}

function handleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const errorMsg = document.getElementById("checkBoxError");

  if (checkBox.checked) {
    console.log("chacked");

    errorMsg.textContent = "";
    errorMsg.classList.add("d-none");
  } else {
    console.log("unchacked");

    errorMsg.classList.remove("d-none");
    errorMsg.textContent = "Please accept the Privacy policy";
    return;
  }
}
function handleSubmit(event) {
  event.preventDefault();

  let isValid = true;

  // Username check
  const nameInput = document.getElementById("inName");
  const nameError = document.getElementById("usernameError");
  if (!nameInput.value.trim()) {
    nameError.textContent = "Please enter a valid username.";
    nameError.classList.remove("d-none");
    isValid = false;
  } else if (nameError.textContent.includes("exists")) {
    // إذا كان الدالة isUserExistByName مسبقاً مبيّنة انه موجود
    isValid = false;
  } else {
    nameError.textContent = "";
    nameError.classList.add("d-none");
  }

  // Email check
  const emailInput = document.getElementById("inEmail");
  const emailError = document.getElementById("emailError");
  if (!emailInput.value.trim()) {
    emailError.textContent = "Please enter a valid email.";
    emailError.classList.remove("d-none");
    isValid = false;
  } else if (emailError.textContent.includes("exists")) {
    isValid = false;
  } else {
    emailError.textContent = "";
    emailError.classList.add("d-none");
  }

  // Password check
  const passwordInput = document.getElementById("inPassword");
  const passwordError = document.getElementById("passwordTooltip");
  if (!passwordInput.value || passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters.";
    passwordError.classList.remove("d-none");
    isValid = false;
  } else {
    passwordError.textContent = "";
    passwordError.classList.add("d-none");
  }

  // Confirm password check
  const confirmPasswordInput = document.getElementById("inPasswordConfirm");
  const confirmPasswordError = document.getElementById("confirmPassword");
  if (
    !confirmPasswordInput.value ||
    confirmPasswordInput.value !== passwordInput.value
  ) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.classList.remove("d-none");
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.add("d-none");
  }

  // Checkbox check
  const checkBox = document.getElementById("checkBox");
  const checkBoxError = document.getElementById("checkBoxError");
  if (!checkBox.checked) {
    checkBoxError.textContent = "Please accept the Privacy Policy.";
    checkBoxError.classList.remove("d-none");
    isValid = false;
  } else {
    checkBoxError.textContent = "";
    checkBoxError.classList.add("d-none");
  }

  // Final result
  if (isValid) {
    console.log("✅ All validations passed. Proceed with registration.");
    handleRegisterUser();
  } else {
    console.log("❌ Validation failed. Fix the errors first.");
  }
}
