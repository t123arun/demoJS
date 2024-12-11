//CODE
console.log("-----PERSONAL TASK MANAGER-----");

//objective
document.getElementById('objective').innerHTML = "This project is comprehensive and allows to touch on all the mentioned topics Core JavaScript Fundamentals and advanced topics (ES6+ Features, DOM manipulation, Browser APIs, Functional Programming, Object-Oriented Programming, and Advanced JavaScript Concepts) while building a useful and interactive application.";

//select the elements
const taskTitle = document.getElementById('task-title');
const taskDate = document.getElementById('task-date');
const taskCategory = document.getElementById('task-category');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const themeToggle = document.getElementById('theme-toggle');

//toggle theme
themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
});

//store tasks
let tasks = [];

//add task function
function addTask(){
    if(!taskTitle.value || !taskDate.value){
        alert('Title and Date are required!');
        return;
    }

    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        date: taskDate.value,
        category: taskCategory.value || 'General',
        completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    saveToLocalStorage();

    //clear form
    taskTitle.value = '';
    taskDate.value = '';
    taskCategory.value = '';
}

//Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

function renderTasks(filter = 'all'){
    tasksList.innerHTML = '';

    const filteredTasks = tasks.filter((task)=>{
        if(filter === 'completed') return task.completed;
        if(filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <span>${task.date}</span>
                <small>Category: ${task.category}</small>
            </div>
            <div>
                <button onclick = "toggleTask(${task.id})">${task.completed ? 'Mark Pending' : 'Mark Complete'}</button>
                <button onclick = "deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
}


//Toggle Completion
function toggleTask(taskId){
    tasks = tasks.map((task)=> 
        task.id === taskId ? {...task, completed: !task.completed } : task
    );
    renderTasks();
    saveToLocalStorage();
}

//Deleting Tasks
function deleteTask(taskId){
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
    saveToLocalStorage();
}

//filter tasks by status

document.querySelectorAll('#filters button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        renderTasks(filter);
    });
});


//browser apis Local Storage

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage(){
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = savedTasks;
    renderTasks();
}

//load tasks on page load
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);

//notification api
function checkOverdueTasks(){
    tasks.forEach((task) => {
        const taskDate = new Date(task.date);
        if(!task.completed && taskDate < new Date()){
            new Notification('Overdue Task', {
                body : `The task "${task.title}" is overdue!`
            });
        }
    });
}

//request notification permission
if(Notification.permission === 'default'){
    Notification.requestPermission();
}

setInterval(checkOverdueTasks, 600000); // check every minute

