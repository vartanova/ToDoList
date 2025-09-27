const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasks = document.getElementById("tasks")
const noTaskContainer = document.querySelector(".list_no-task")
const toDoTaskContainer = document.querySelector(".list_to-do")
const completedTaskContainer = document.querySelector(".list_completed")

const noTaskContainerTitle = document.querySelector(".container__no-task_empty")


const taskList = []

function addTask () { // функция создания новой таски
    const textInput = inputText.value; //храню здесь значение инпута
    if (inputText.value === "") return; // если значение инпута пустое, то выходим

    const newTask = { // создаем новую таску объектом
        textInput, 
        status: false,
        id: crypto.randomUUID() // генерим рандомный id
    };
    
    taskList.push(newTask); // добавляем новую таску в массив

    inputText.value = ""; // очищаем инпут
    sync(); //вызываем основную функцию
}


function createTask () {
    taskList.forEach(task => {
        const li = document.createElement("li"); //создаю li
        li.textContent = task.textInput; //помещаем в li свойство передаваемого объекта (textInput) в качестве параметра task
        toDoTaskContainer.appendChild(li); //добавляю созданную таску сразу в контейнер to do

        const checkedBtn = document.createElement("button"); //кнопка выполнения таски
        checkedBtn.className = 'btn__checked';
        checkedBtn.addEventListener('click', function () { //при клике на checkedBtn меняем статус таски на true
            task.status = true;
            sync();
        });

        const deleteBtn = document.createElement("button"); //создаю кнопку удаления 
        deleteBtn.className = 'btn__delete';
        deleteBtn.addEventListener('click', function() {deleteTask(task)});

        li.appendChild(checkedBtn);
        li.appendChild(deleteBtn);
    
        if (task.status) {
            completedTaskContainer.appendChild(li)
            li.classList.add('checked')
        } else {
            toDoTaskContainer.appendChild(li);
        }
    });
    
}


function sync () {
    toDoTaskContainer.innerHTML = '';
    completedTaskContainer.innerHTML = ''; //очищаем контейнеры, чтобы таски не дублировались каждый раз, когда мы проходимся по toDoTask
    createTask()
}


function deleteTask (task) {
    const index = taskList.findIndex((curr) => curr.id === task.id); //прохожусь по нашему массиву и ищу по нужному id
    // если id которое мы принимаем, равно тому же id по которому проходимся в массиве, то сохраняю индекс на том моменте, где совпал id в переменную
    if (index !== -1) { //если мы нашли подходящий индекс
        taskList.splice(index, 1); //удаляю 1 элем из списка начиная с индекса, который нашли
        sync();
    };
}


addBtn.addEventListener('click', addTask);




const all = document.getElementById("filteredAllTasks");
const completed = document.getElementById("filteredCompletedTasks");
const inProgress = document.getElementById("filteredInProgressTasks");

all.addEventListener('click', function () {
    taskList})

completed.addEventListener('click', function () {
    taskList.forEach((task) => task.status === true)
})

inProgress.addEventListener('click', function () {
    taskList.forEach((task) => task.status !== true)
})




// let filteredTask = [];

// function filteredTasks () {
//     if (filteredTask === 'all') {
//         taskList
//     } else if (filteredTask === 'completed') {
//         taskList.filter(task => task.status === true)
//     } else if (filteredTask === 'inProgress') {
//         taskList.filter(task => task.status === false)
//     }
// }

// all.addEventListener('click', function () {
//     filteredTask = 'all';
//     sync();
// });

// completed.addEventListener('click', function () {
//     filteredTask = 'completed';
//     sync();
// });

// inProgress.addEventListener('click', function () {
//     filteredTask = 'inProgress';
//     sync();
// });