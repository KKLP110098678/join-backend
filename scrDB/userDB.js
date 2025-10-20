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
      if (users[key].email === objToFind.email && users[key].password === objToFind.password) {
        console.log("User " , users[key]);
        
        return users[key];
      }
    }
    return false;
  } catch (error) {
    console.error("Worng email or password:", error);
    return false;
  }
}