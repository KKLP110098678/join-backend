let objToFind = { email: "", password: "" };
function findUserByEmail(inEmail) {
  const user = users.find((user) => user.email === email);
  if (user) {
    // User found, handle login
    handleUserFound(user);
  } else {
    // User not found, show error
    handleUserNotFound();
  }
}
// checkPassword
function getEmail(inEmail) {
  if (validateEmailFormat(inEmail)) {
    objToFind.email = inEmail;
    handleErrorSet("inPassword", "fieldEmail", "emailError", true);
  }
}

function getPassword(inPassword) {
  realPassword = updateVarible(inPassword, realPassword);
  objToFind.password = realPassword;
  removeBorderColor("fieldPassword");
}

function checkCardinal() {}

function passwordInput(input) {
  const inPassWord = input.value;
  realPassword = updateVarible(inPassWord, realPassword);
  passeordVisible = hedienWord(input, passeordVisible, realPassword);
  toggleVisibilityIcon();
  setBorderColor("fieldPassword", true);
}

// in login func
//    if (!inPassword) {
//   console.log("pass");
//   handleErrorSet(
//     "",
//     "inPassword",
//     "fieldPassword",
//     false,
//     "Please enter a valid Password!"
//   );
// }

function handelLogIn() {
  
} 