async function addNewUser(newUser) {
  try {
    const usersRef = firebase.database().ref("users");
    const newUserRef = usersRef.push();
    await newUserRef.set({
      name: newUser.nuName,
      email: newUser.nuEmail,
      password: newUser.nuPassword,
    });
    // return newUserRef; if i want to use it later
  } catch (error) {
    console.error("Error registering user:", error);
  }
}
