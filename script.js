// Event listener for page load — ensures DOM is ready before code runs
document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // Select DOM Elements
  // -----------------------------
  const addButton = document.getElementById('add-task-btn');  // Add Task button
  const taskInput = document.getElementById('task-input');    // Task input field
  const taskList = document.getElementById('task-list');      // Unordered list for tasks

  // -----------------------------
  // In-memory tasks array (source of truth)
  // -----------------------------
  let tasks = []; // each item is a string (task text)

  // -----------------------------
  // Render tasks from the `tasks` array into the DOM
  // -----------------------------
  function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';

    // Create DOM nodes for each task
    tasks.forEach((taskText, index) => {
      const li = document.createElement('li');
      li.textContent = taskText;

      // Create Remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('remove-btn');

      // When clicked, remove the task from the tasks array, re-render and save
      removeButton.onclick = () => {
        // Remove the item from the tasks array
        tasks.splice(index, 1);
        // Re-render the list to fix indices and DOM
        renderTasks();
        // Persist updated tasks to Local Storage
        saveTasks();
      };

      // Append remove button and li to the list
      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }

  // -----------------------------
  // Save tasks array to Local Storage
  // -----------------------------
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // -----------------------------
  // Load tasks from Local Storage into `tasks` array and render
  // -----------------------------
  function loadTasks() {
    const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
    // Ensure it's an array — defensive programming
    if (Array.isArray(stored)) {
      tasks = stored;
    } else {
      tasks = [];
    }
    renderTasks();
  }

  // -----------------------------
  // Add task function
  // - taskText (optional): if provided, use it; otherwise pull from taskInput
  // - save (boolean): whether to persist to Local Storage (default true)
  // -----------------------------
  function addTask(taskText, save = true) {
    // If taskText not given, read from the input field
    const text = (typeof taskText === 'string' && taskText.trim() !== '') 
      ? taskText.trim() 
      : taskInput.value.trim();

    // Validation: prevent empty tasks
    if (!text) {
      alert('Enter a task');
      return;
    }

    // Update tasks array and optionally persist
    tasks.push(text);

    // Re-render list and persist
    renderTasks();
    if (save) saveTasks();

    // Clear input field for user's next task
    taskInput.value = '';
  }

  // -----------------------------
  // Attach Event Listeners
  // -----------------------------
  addButton.addEventListener('click', () => addTask()); // click to add
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // -----------------------------
  // Initialize app by loading tasks from Local Storage
  // -----------------------------
  loadTasks();

});





