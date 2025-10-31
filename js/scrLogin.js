let objToFind = { email: "", password: "" };

// checkPassword
function getEmail(inEmail) {
  if (validateEmailFormat(inEmail)) {
    objToFind.email = inEmail;
    handleErrorSet("inPassword", "fieldEmail", "emailError", true);
    return true;
  }
}

function getPassword(inPassword) {
  realPassword = updateVarible(inPassword, realPassword);
  objToFind.password = realPassword;
  // removeBorderColor("fieldPassword");
  handleErrorSet("checkBox", "fieldPassword", "passwordTooltip", true);

}

function checkCardinal() {
  if (objToFind.email === "") {
    handleErrorSet(
      "inPassword",
      "fieldEmail",
      "emailError",
      false,
      "Please enter a valid E-Mail!"
    );
    return false;
  } else if (objToFind.password === "") {
    toggleErrorMessage(
      "passwordTooltip",
      false,
      "Please enter a valid password!"
    );
    setBorderColor("fieldPassword", false);
    return false;
  } else {
    toggleErrorMessage("passwordTooltip", true, "");
    return true;
  }
}

function passwordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  setBorderColor("fieldPassword", true);
  objToFind.password = realPassword;
}

async function handelLogIn() {
  if (checkCardinal()) {
    const user = await findUserByCardinal(objToFind);

    if (user) {
      updateCurrentUser(user);
      window.location.href = "../html/summary.html";
    } else {
      console.log("it not found");
      handleWrongCardinal()
    }
  }
}

function handleWrongCardinal() {
  const message = "Check your email and password. Please try again.";
  setBorderColor('fieldEmail',false);
  setBorderColor('fieldPassword',false);
  toggleErrorMessage("passwordTooltip",false,message);

}

function toggleRememberMe() {
  const checkBox = document.getElementById("checkBox");
  const checkBoxImage = document.getElementById("checkBoxImage");
  if (realPassword==="") {
    return;
  }
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