const newUser = { nuName: "", nuEmail: "", nuPassword: "" };

function checkEmptyInputs() {
  if (!checkInputName()) {
    return false;
  } else if (!checkInputEmail()) {
    return false;
  } else if (!checkInputPassword()) {
    return false;
  } else if (!checkInputConfirmPassword()) {
    return false;
  } else if (!checkAcceptTerms()) {
    return false;
  }

  return true;
}

async function handleRegisterUser() {
  if (!checkEmptyInputs()) {
    return;
  }
  try {
    await addNewUser(newUser);
    showSuccessAndRedirect();
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

function checkInputName() {
  const inName = document.getElementById("inName").value.trim();
  if (inName === "") {
    handleErrorSet(
      "inEmail",
      "fieldName",
      "usernameError",
      false,
      "Please enter a valid Username!"
    );
    return false;
  } else {
    return true;
  }
}

async function isUserExistByName(inName) {
  if (!inName || !inName.trim()) return false;
  try {
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
    }
    newUser.nuName = inName;
    handleErrorSet("inEmail", "fieldName", "usernameError", true);
    return true;
  } catch (error) {
    return false;
  }
}

function checkInputEmail() {
  const inEmail = document.getElementById("inEmail").value.trim();
  if (inEmail === "") {
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  } else {
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

function toggleCheckBox(event) {
  let checkBox = document.getElementById("privacy-checkbox");
  if (checkBox.disabled) {
    event.preventDefault();
    return;
  }
  setTimeout(function () {
    let signUpButton = document.getElementById("btnSignup");
    if (checkBox.checked) {
      signUpButton.disabled = false;
    } else {
      signUpButton.disabled = true;
    }
  }, 0);
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
  console.log("toggleNextElement called:", eleID, "status:", status);
  let el = document.getElementById(eleID);
  console.log("Element found:", el);
  if (!el) return;
  if (status) {
    el.disabled = false;
    console.log("Element enabled! disabled =", el.disabled);
    el.focus();
  } else {
    el.disabled = true;
  }
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

function restInputField(idField, idMsgError) {
  setBorderColor(idField, true);
  toggleErrorMessage(idMsgError, true, "");
}

function showSuccessAndRedirect() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 2000);
}
