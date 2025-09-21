const newUser = [{ nuName: "", nuEmail: "", inPassword: "" }];

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
function showSuccessAndRedirect() {
  const overlay = document.getElementById("successOverlay");
  overlay.classList.remove("d-none");

  setTimeout(() => {
    window.location.href = "../html/login.html";
  }, 2000);
}
