const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasksContainer = document.getElementById("tasks")

const burger = document.querySelector('.burger')
const burgerItem = document.querySelector('.burger-menu__lists-btn')

const all = document.getElementById("filteredAllTasks");
const completed = document.getElementById("filteredCompletedTasks");
const inProgress = document.getElementById("filteredInProgressTasks");
const deleteAll = document.getElementById('deleteAllTasks')

let taskList = []
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
    saveTasksToLocalStorage();
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
            saveTasksToLocalStorage();
            updateFilter();
        };
    });

    const checkedBtn = document.createElement("button"); // создаю кнопку выполнения таски
    checkedBtn.className = 'btn__checked';
    checkedBtn.addEventListener('click', function () { // выолненная таска - true
        task.status = !task.status;
        saveTasksToLocalStorage();
        updateFilter();
    });

    li.appendChild(checkedBtn); // добавляю кнопки в таску
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
    saveTasksToLocalStorage()
}

function filtered (filter) {
    defaultFilter = filter;
    localStorage.setItem('filter', filter);

    if (filter === "all") {
        filteredList = taskList;
    } else if (filter === "completed") {
        filteredList = taskList.filter(task => task.status); //если checked
    } else if (filter === "inProgress") {
        filteredList = taskList.filter(task => !task.status);
    }
    sync(filteredList, () => filtered(filter)) //передаю call-back функцию
    saveTasksToLocalStorage();

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

deleteAll.addEventListener('click', function () {
    const idFilteredTasks = filteredList.map(task => task.id); // получаем ID задач, которые нужно удалить

    taskList = taskList.filter(task => !idFilteredTasks.includes(task.id) // всегда будет False тк у нас все id в списке idFilteredTasks, которые нужно удалить. значит все не попадут в filteredTasks
    )

    saveTasksToLocalStorage();
    filtered(defaultFilter);
});


// Сохраняем весь список задач
function saveTasksToLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function loadTasks() {
    const takenTasks = localStorage.getItem('taskList');
    
    let parsedTasks = [];

    if (takenTasks) {
        parsedTasks = JSON.parse(takenTasks)
    }

    taskList.length = 0;
    taskList.push(...parsedTasks);

    const takenFilter = localStorage.getItem('filter');

    filtered(takenFilter);
}

window.addEventListener('DOMContentLoaded', loadTasks)
