const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasksContainer = document.getElementById("tasks")

const all = document.getElementById("filteredAllTasks");
const completed = document.getElementById("filteredCompletedTasks");
const inProgress = document.getElementById("filteredInProgressTasks");


const taskList = []

function addTask () {
    const textInput = inputText.value;
    if (inputText.value === "") return;

    const newTask = { // создаем новую таску
        textInput, 
        status: false,
        id: crypto.randomUUID()
    };
    
    taskList.push(newTask); // добавляем новую таску в массив

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
            updateFilter();
        };
    });

    const checkedBtn = document.createElement("button"); //создаю кнопку выполнения таски
    checkedBtn.className = 'btn__checked';
    checkedBtn.addEventListener('click', function () { //выолненная таска - true
        task.status = !task.status;
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

let defaultFilter = 'all'
let filteredList = []; // Новый список, в который будут попадать отфильтрованные значения
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