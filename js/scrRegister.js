// Mock database
const users = [
  { name: "assim", email: "wassim@da.com" },
  { name: "Ali", email: "ali@da.com" },
];
const newUser = [{ nuName: "", nuEmail: "", inPassword: "" }];

async function handleRegisterUser(event) {
  event.preventDefault();
  console.log("handleRegisterUser called");
  try {
    await addNewUser(newUser);

    console.log("User registered successfully!");

    // window.location.href = "../index.html";
  } catch (error) {
    console.error("Error registering user:", error);
    // alert("Something went wrong. Try again.");
  }
}

function isUserExistByName(inName) {
  const error = document.getElementById("usernameError");
  const emailField = document.getElementById("inEmail");

  if (!inName) return;

  const exists = users.some(
    (user) => user.name.toLowerCase() === inName.toLowerCase()
  );
  if (exists) {
    error.textContent = "Username already exists!";
    error.classList.remove("d-none");
    emailField.disabled = true;
    resetFromStep(1);
  } else {
    newUser.nuName = inName;
    error.textContent = "";
    error.classList.add("d-none");
    emailField.disabled = false;
    emailField.focus();
  }
}

function isUserExistByEmail(inEmail) {
  const error = document.getElementById("emailError");
  const passwordField = document.getElementById("inPassword");

  if (!inEmail) return;

  const exists = users.some(
    (user) => user.email.toLowerCase() === inEmail.toLowerCase()
  );
  if (!validateEmailFormat(inEmail)) {
    passwordField.disabled = true;
    return;
  }
  if (exists) {
    error.textContent = "E-Mail already exists!";
    error.classList.remove("d-none");
    resetFromStep(2);
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
    resetFromStep(2);

    return false;
  } else {
    error.textContent = "";
    error.classList.add("d-none");
    return true;
  }
}

//
function isPasswordMatching(confirmPassword) {
  // const confirmField = document.getElementById("inPasswordConfirm");
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

    resetFromStep(4);
  }
}
// Qw123456
function resetFromStep(step) {
  const emailField = document.getElementById("inEmail");
  const passwordField = document.getElementById("inPassword");
  const confirmField = document.getElementById("inPasswordConfirm");
  const checkBox = document.getElementById("checkBox");
  const signUpBtn = document.getElementById("btnSignup");

  switch (step) {
    case 1:
      emailField.disabled = true;
      passwordField.disabled = true;
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 2:
      passwordField.disabled = true;
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 3:
      confirmField.disabled = true;
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;

    case 4:
      checkBox.disabled = true;
      signUpBtn.disabled = true;
      break;
  }
}

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
    resetFromStep(3);
  }
}
function isPasswordValid(rules) {
  return rules.minLength && rules.hasUpper && rules.hasLower && rules.hasNumber;
}
function buildPasswordMessage(rules) {
  let message = "";

  message += `<span class="${rules.minLength ? "valid" : "invalid"}">
                ${rules.minLength ? "✔" : "❌"} At least 8 characters
              </span><br>`;
  message += `<span class="${rules.hasUpper ? "valid" : "invalid"}">
                ${rules.hasUpper ? "✔" : "❌"} At least one uppercase letter
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
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
}

function handleCheckBox() {
  const checkBox = document.getElementById("checkBox");
  const btnSignup = document.getElementById("btnSignup");
  const errorMsg = document.getElementById("checkBoxError");

  if (checkBox.checked) {
    // btnSignup.disabled = false;
    errorMsg.textContent = "";
    errorMsg.classList.add("d-none");
  } else {
    // btnSignup.disabled = true;
    errorMsg.textContent = "يجب الموافقة على الترخيص!";
    errorMsg.classList.remove("d-none");
  }
}
