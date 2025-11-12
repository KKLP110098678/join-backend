let rememberMe = false;
let objToFind = { email: "", password: "" };

function init() {
  const savedUser = getUserFromLS();
  if (savedUser) {
    objToFind.email = savedUser.currentEmail;
    objToFind.password = savedUser.currentPassword;
    rememberMe = true;
    setSavedEmail(savedUser.currentEmail);
    setSavedPassword(savedUser.currentPassword);
    setRememberMe();
  }
}

function setSavedEmail(emailFromLS) {
  const inEmail = document.getElementById("in-email");
  inEmail.value = emailFromLS;
}

function setSavedPassword(passwordFromLS) {
  const iputPass = document.getElementById("in-password");
  realPassword = passwordFromLS;
  toggleVisibilityIcon();
  hedienWord(iputPass, false, realPassword);
}

async function addNewUser(newUser) {
  try {
    const usersRef = firebase.database().ref("users");
    const newUserRef = usersRef.push();
    await newUserRef.set({
      name: newUser.nuName,
      email: newUser.nuEmail,
      password: newUser.nuPassword,
    });
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

async function isUserNameTaken(userName) {
  try {
    const usersRef = firebase.database().ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();
    if (!users) return false;
    for (let key in users) {
      if (users[key].name === userName) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

async function isUserEmailTaken(inEmail) {
  try {
    const usersRef = firebase.database().ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();
    if (!users) return false;
    for (let key in users) {
      if (users[key].email === inEmail) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error checking user Email:", error);
    return false;
  }
}

async function findUserByCardinal(objToFind) {
  try {
    const usersRef = firebase.database().ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();
    if (!users) return null;
    for (let key in users) {
      if (
        users[key].email === objToFind.email &&
        users[key].password === objToFind.password
      ) {
        return users[key];
      }
    }
    return false;
  } catch (error) {
    console.error("Worng email or password:", error);
    return false;
  }
}

function updateCurrentUser(dbUser, rememberMe) {
  if (!dbUser) return;

  if (rememberMe) {
    saveUserInLS(dbUser);
  } else {
    removeUserFromLS();
  }
  const currentUser = {};
  currentUser.currentName = dbUser.name;
  currentUser.currentEmail = dbUser.email;
  currentUser.currentPassword = dbUser.password;
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
}

function saveUserInLS(objToSave) {
  const userLS = {
    currentName: objToSave.name,
    currentEmail: objToSave.email,
    currentPassword: objToSave.password,
  };

  localStorage.setItem("savedUser", JSON.stringify(userLS));
}

function getUserFromLS() {
  const saved = localStorage.getItem("savedUser");
  if (!saved) {
    return null;
  }

  const user = JSON.parse(saved);
  return user;
}

function removeUserFromLS() {
  localStorage.removeItem("savedUser");
}
