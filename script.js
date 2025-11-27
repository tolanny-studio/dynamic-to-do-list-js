// Event listener for page load
document.addEventListener('DOMContentLoaded',()=>{
  
  // select add task button
  const addButton = document.getElementById('add-task-btn')
  //select the input field
  const taskInput = document.getElementById('task-input')
  //select unordered list 
  const taskList = document.getElementById('task-list')

  //create an addTask function, responsible for adding new task to the list
  const addTask =()=>{
    const taskText = taskInput.value.trim()

    if(!taskText){
      alert('Enter a task')
      return
    }
    // create a list element
    const li = document.createElement('li')
    li.textContent = taskText

    // create a button for removing the task
    const removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.classList.add('remove-btn')

    //assign an onclick event to the remove button to remove task from the ul element of id task-list

    removeButton.onclick =()=>{
      taskList.removeChild(li)
    }

    //append the remove button to li element
    li.appendChild(removeButton)

    // append the li element to the task list
    taskList.appendChild(li)

    // clear the input field
    taskInput.value = ''
  }

  // Event listener that calls add task
  addButton.addEventListener('click',addTask)

  // add event listener to taskInput for 'keypress' 

  taskInput.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter'){
      addTask()
    }
  })


  // Invoke addTask on DOMContentLoaded 
  addTask()

})





