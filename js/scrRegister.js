const newUser = { nuName: "", nuEmail: "", nuPassword: "" };

async function handleRegisterUser(event) {
  event.preventDefault();
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

function toggleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");
  if (checkBox.disabled) return;
  checkBox.checked = !checkBox.checked;
  if (checkBox.checked) {
    checkBox.checked = false;
    checkBoxImage.src = "../assets/icon/sign/checked.svg";
    handleErrorSet("btnSignup", "checkBox", "checkBoxError", true);
  } else {
    checkBoxImage.src = "../assets/icon/sign/unchacked.svg";
    checkBox.checked = true;
    handleErrorSet(
      "btnSignup",
      "checkBox",
      "checkBoxError",
      false,
      "Please accept the Privacy policy"
    );
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
