let ibjToFind = { email: "", password: "" };
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
  ibjToFind.email = inEmail;
}
function getPassword(inPassword) {
  ibjToFind.password = inPassword;
}
function checkCardinal() {}
