const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasksContainer = document.getElementById("tasks")

const burger = document.querySelector('.burger')
const burgerItem = document.querySelector('.burger-menu__lists-btn')

const all = document.getElementById("filteredAllTasks");
const completed = document.getElementById("filteredCompletedTasks");
const inProgress = document.getElementById("filteredInProgressTasks");
const deleteAll = document.getElementById('deleteAllTasks')

const modalWindow = document.getElementById('modalWindow')
const closeModal = document.getElementById('closeModal')



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
        modalWindow.classList.add('open');
        return
    };

    const newTask = { // создаем новую таску
        textInput, 
        status: false,
        id: crypto.randomUUID()
    };
    
    taskList.push(newTask); // добавляем новую таску в массив
    inputText.value = "";
    filtered(defaultFilter);
}

function createTask (task) {

    const wrapperMainContainer = document.createElement("div")
    wrapperMainContainer.classList.add('wrapperMainContainer')
    
    const li = document.createElement("div"); // создаю таску
    li.classList.add('text-task');

    li.textContent = task.textInput;

    wrapperMainContainer.addEventListener('dblclick', function () { // редактирование таски
        const editTask = document.createElement('input');
        editTask.type = 'text';
        editTask.value = task.textInput;
        editTask.classList.add('edit-task');

        wrapperMainContainer.replaceChild(editTask, li);
        editTask.focus();

        function saveEdit() {
            const newValue = editTask.value;
            if (newValue !== "") {
                task.textInput = newValue;
            }
            filtered(defaultFilter); // Перерисовываем задачи
        }

        editTask.addEventListener('blur', saveEdit);

        editTask.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                saveEdit();
            }
        });
    });

    wrapperMainContainer.appendChild(li);
    
    const deleteBtn = document.createElement("button"); //создаю кнопку удаления 
    deleteBtn.className = 'btn__delete';
    deleteBtn.addEventListener('click', function() {
        const index = taskList.findIndex((curr) => curr.id === task.id);
        if (index !== -1) {
            taskList.splice(index, 1);
            filtered(defaultFilter);
        };
    });

    const checkedBtn = document.createElement("button"); // создаю кнопку выполнения таски
    checkedBtn.className = 'btn__checked';
    checkedBtn.addEventListener('click', function () { // выолненная таска - true
        task.status = !task.status;
        filtered(defaultFilter);
    });

    wrapperMainContainer.appendChild(checkedBtn); // добавляю кнопки в таску
    wrapperMainContainer.appendChild(deleteBtn);

    if (task.status) {
        checkedBtn.classList.add('checked');
        li.classList.add('checked'); // добавляю состояние таске
    } else {
        checkedBtn.classList.add('unchecked'); // изменить на ремув чекед
        li.classList.add('unchecked');
    }

    return wrapperMainContainer;
}

function sync (filteredList) {
    tasksContainer.innerHTML = ''; // очищаем ul

    filteredList.forEach(task => {
        const li = createTask(task);
        tasksContainer.appendChild(li);
    });
    saveTasksToLocalStorage();
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
    } else {
        filteredList = taskList;
    }
    sync(filteredList);
}
addBtn.addEventListener('click', addTask)
inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

inputText.addEventListener('dblclick', function() {
    addTask();
})


closeModal.addEventListener('click', function () {
    modalWindow.classList.remove('open');
});

modalWindow.addEventListener('click', (event) => {
    if (!modalContent.contains(event.target)) {
        modalWindow.classList.remove('open');
    }
});

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

    taskList = taskList.filter(task => !idFilteredTasks.includes(task.id)); // всегда будет False тк у нас все id в списке idFilteredTasks, которые нужно удалить. значит все не попадут в filteredTasks

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

window.addEventListener('DOMContentLoaded', loadTasks);
