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
      "in-email",
      "field-name",
      "username-error",
      false,
      "Username cannot be empty"
    );
    return false;
  }
  const exists = await isUserNameTaken(inName);
  if (exists) {
    handleErrorSet(
      "in-email",
      "field-name",
      "username-error",
      false,
      "Username already exists!"
    );
    return false;
  } else {
    newUser.nuName = inName;
    handleErrorSet("in-email", "field-name", "username-error", true);
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
        "in-password",
        "field-email",
        "email-error",
        false,
        "E-Mail already exists!"
      );
      return false;
    }
    newUser.nuEmail = inEmail;
    handleErrorSet("in-password", "field-email", "email-error", true);
    return true;
  } catch (error) {
    console.error("Error validating email:", error);
    handleErrorSet(
      "in-password",
      "field-email",
      "email-error",
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
      "in-password",
      "field-email",
      "email-error",
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
    let signUpButton = document.getElementById("btn-signup");
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
  toggleErrorMessage(errorId, status, errorMessage);
}

function toggleErrorMessage(elementId, isValid, message = "") {
  const el = document.getElementById(elementId);
  if (!el) return;

  if (isValid) {
    el.classList.add("d-none");
    el.textContent = "";
    el.innerHTML = "";
  } else {
    el.classList.remove("d-none");
    if (elementId === "password-tooltip") {
      el.innerHTML = message;
    } else {
      el.textContent = message;
    }
  }
}

function showSuccessAndRedirect(redirectPath = CONFIG.routes.login) {
  const overlay = document.getElementById("success-overlay");
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
  feldInput.classList.remove("valid-input", "invalid-input");
}

function setBorderColor(inID, status) {
  const feldInput = document.getElementById(inID);
  if (!feldInput) {
    console.warn(`setBorderColor: element with id "${inID}" not found.`);
    return;
  }

  feldInput.classList.remove("valid-input", "invalid-input");

  if (status) {
    feldInput.classList.add("valid-input");
  } else {
    feldInput.classList.add("invalid-input");
  }
}
