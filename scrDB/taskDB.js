async function addNewTask(taskData) {
  try {
    const tasksRef = firebase.database().ref("boards");
    const newTasksRef = tasksRef.push();
    await newTasksRef.set(taskData);
    console.log("Task saved to Firebase");
  } catch (error) {
    console.error("Error saving task:", error);
  }
}