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
    handleErrorSet(
      "inEmail",
      "fieldName",
      "usernameError",
      false,
      "Username already exists!"
    );
    return false;
  } else {
    newUser.nuName = inName;
    handleErrorSet("inEmail", "fieldName", "usernameError", true);
    return true;
  }
}

async function isUserExistByEmail(inEmail) {
  if (!inEmail || !inEmail.trim()) return false;
  try {
    if (!validateEmailFormat(inEmail)) {
      return false;
    }
    const exists = await isUserEmailTaken(inEmail);
    if (exists) {
      handleErrorSet(
        "inPassword",
        "fieldEmail",
        "emailError",
        false,
        "E-Mail already exists!"
      );
      return false;
    }
    newUser.nuEmail = inEmail;
    handleErrorSet("inPassword", "fieldEmail", "emailError", true);
    return true;
  } catch (error) {
    return false;
  }
}

function validateEmailFormat(inEmail) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inEmail)) {
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  }
  return true;
}

// Qw123456
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
  // const confirmPasswordInput = document.getElementById("inPasswordConfirm");
  // const confirmPasswordError = document.getElementById("confirmPassword");
  // if (
  //   !confirmPasswordInput.value ||
  //   confirmPasswordInput.value !== passwordInput.value
  // ) {
  //   confirmPasswordError.textContent = "Passwords do not match.";
  //   confirmPasswordError.classList.remove("d-none");
  //   isValid = false;
  // } else {
  //   confirmPasswordError.textContent = "";
  //   confirmPasswordError.classList.add("d-none");
  // }

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
  console.log(nextFieldId);
  
  toggleNextElement(nextFieldId, status);
  toggleErrorMessage(errorId, status, errorMessage);
}

function toggleErrorMessage(elementId, isValid, message = "") {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (isValid) {
    el.classList.add("d-none");
    el.textContent = "";
  } else {
    el.classList.remove("d-none");
    if (/<[a-z][\s\S]*>/i.test(message)) {
      el.innerHTML = message;
    } else {
      el.textContent = message;
    }
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
  console.log("removeBorderColor");
  
}

function setBorderColor(inID, status) {
  const feldInput = document.getElementById(inID);
  feldInput.classList.remove("validInput", "invalidInput");

  if (status) {
    feldInput.classList.add("validInput");
  } else {
    feldInput.classList.add("invalidInput");
  }
}
