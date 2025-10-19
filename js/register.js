const CONFIG = {
  routes: {
    login: "../html/login.html", // Default login redirect path
  },
};

const newUser = { nuName: "", nuEmail: "", nuPassword: "" };

async function handleRegisterUser(event) {
  event.preventDefault();
  try {
    await addNewUser(newUser);
    console.log(newUser);

    showSuccessAndRedirect();
  } catch (error) {
    console.error("Error registering user:", error);
    const errorOverlay = document.getElementById("errorMessage");
    if (errorOverlay) {
      errorOverlay.textContent = "Registration failed. Please try again.";
      errorOverlay.classList.remove("d-none");
    }
  }
}

async function isUserExistByName(inName) {
  if (!inName || !inName.trim()) {
    handleErrorSet(
      "inEmail",
      "fieldName",
      "usernameError",
      false,
      "Username cannot be empty"
    );
    return false;
  }
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
    console.error("Error validating email:", error);
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Error validating email. Please try again."
    );
    return false;
  }
}

function validateEmailFormat(inEmail) {
  // RFC 5322 compliant email regex that handles most valid email formats
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
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
    el.textContent = message;
  }
}

function toggleNextElement(eleID, status) {
  let el = document.getElementById(eleID);
  if (!el) return;
  if (status) {
    el.disabled = false;
    el.focus();
  } else {
    el.disabled = true;
  }
}

function showSuccessAndRedirect(redirectPath = CONFIG.routes.login) {
  const overlay = document.getElementById("successOverlay");
  if (!overlay) {
    console.error("Success overlay not found");
    window.location.href = redirectPath;
    return;
  }
  overlay.classList.remove("d-none");

  setTimeout(function () {
    window.location.href = redirectPath;
  }, 2000);
}

function removeBorderColor(inID) {
  const feldInput = document.getElementById(inID);
  if (!feldInput) {
    console.warn(`removeBorderColor: element with id "${inID}" not found.`);
    return;
  }
  feldInput.classList.remove("validInput", "invalidInput");
}

function setBorderColor(inID, status) {
  const feldInput = document.getElementById(inID);
  if (!feldInput) {
    console.warn(`setBorderColor: element with id "${inID}" not found.`);
    return;
  }

  feldInput.classList.remove("validInput", "invalidInput");

  if (status) {
    feldInput.classList.add("validInput");
  } else {
    feldInput.classList.add("invalidInput");
  }
}
