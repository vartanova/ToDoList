const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasksContainer = document.getElementById("tasks")

const burger = document.querySelector('.burger')
const burgerItem = document.querySelector('.burger-menu__lists-btn')

const all = document.getElementById("filteredAllTasks");
const completed = document.getElementById("filteredCompletedTasks");
const inProgress = document.getElementById("filteredInProgressTasks");
const deleteAll = document.getElementById('deleteAllTasks')

const taskList = []
let defaultFilter = 'all'  //по умолчанию пусть стоит фильтр all
let filteredList = []; // Новый список, в который будут попадать отфильтрованные значения


burger.addEventListener ('click', function () {
    this.classList.toggle('active');
    burgerItem.classList.toggle('open');
})

function addTask () {
    const textInput = inputText.value;
    if (inputText.value === "") {
        alert('Введите таску')
        return
    };

    const newTask = { // создаем новую таску
        textInput, 
        status: false,
        id: crypto.randomUUID()
    };
    
    taskList.push(newTask); // добавляем новую таску в массив
    saveTasks();
    inputText.value = "";
    filtered(defaultFilter)
}

function createTask (task, updateFilter) {
    const li = document.createElement("li"); // создаю таску
    li.textContent = task.textInput;
    tasksContainer.appendChild(li);
    
    const deleteBtn = document.createElement("button"); //создаю кнопку удаления 
    deleteBtn.className = 'btn__delete';
    deleteBtn.addEventListener('click', function() {
        const index = taskList.findIndex((curr) => curr.id === task.id);
        if (index !== -1) {
            taskList.splice(index, 1);
            saveTasks();
            updateFilter();
        };
    });

    const checkedBtn = document.createElement("button"); //создаю кнопку выполнения таски
    checkedBtn.className = 'btn__checked';
    checkedBtn.addEventListener('click', function () { //выолненная таска - true
        task.status = !task.status;
        saveTasks();
        updateFilter();
    });

    li.appendChild(checkedBtn); //добавляю кнопки в таску
    li.appendChild(deleteBtn);

    if (task.status) {
        li.classList.add('checked') // добавляю состояние таске
    } else {
        li.classList.add('unchecked')
    }
    return li;
}

function sync (filteredList, updateFilter) {
    tasksContainer.innerHTML = ''; // очищаем ul
    filteredList.forEach(task => {
        const li = createTask(task, updateFilter);
    });
}

function filtered (filter) {
    if (filter === "all") {
        filteredList = taskList;
    } else if (filter === "completed") {
        filteredList = taskList.filter(task => task.status === true); //если checked
    } else if (filter === "inProgress") {
        filteredList = taskList.filter(task => task.status !== true);
    }
    sync(filteredList, () => filtered(filter)) //передаю call-back функцию
}


addBtn.addEventListener('click', addTask);

all.addEventListener('click', function () {
    filtered('all');
});

completed.addEventListener('click', function () {
    filtered('completed');
});

inProgress.addEventListener('click', function () {
    filtered('inProgress');
});

deleteAll.addEventListener('click', function() {
    const filteredCurr = filteredList.map(task => task.id); //только те таски, которые отобразились при конкретной фильтрации
    for (let i = taskList.length - 1; i >= 0; i--) {
        if (filteredCurr.includes(taskList[i].id)) {
            taskList.splice(i, 1); //удаляем из общего списка только те, которые нам нужны
        }
    }
    saveTasks();
    filtered(defaultFilter);
});


// Сохраняем весь список задач
function saveTasks() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function loadTasks() {
    const saved = localStorage.getItem('taskList');
    let savedTasks = []
    if (saved) {
        savedTasks = JSON.parse(saved)
    } return savedTasks
}

function loadTaskToWindow () {
    taskList.push(...loadTasks());
    filtered(defaultFilter)
}

window.addEventListener('DOMContentLoaded', loadTaskToWindow )
