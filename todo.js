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

function sync () {
    toDoTaskContainer.innerHTML = '';
    completedTaskContainer.innerHTML = ''; //очищаем контейнеры, чтобы таски не дублировались каждый раз, когда мы проходимся по toDoTask

    const toDoTask = taskList.filter(newTask => !newTask.status); //создаем переменную, где будем хранить таски, которые надо сделать (статус false)
    const completedTask = taskList.filter(newTask => newTask.status); //создаем переменную с выполненными тасками (у которых true)

    toDoTask.forEach(task => {
        const li = document.createElement("li"); //создаю li
        li.textContent = task.textInput; //помещаем в li свойство передаваемого объекта (textInput) в качестве параметра task
        toDoTaskContainer.appendChild(li); //добавляю созданную таску сразу в контейнер to do

        const checkedBtn = document.createElement("button"); //кнопка выполнения таски
        checkedBtn.className = 'btn__checked';
        li.appendChild(checkedBtn);

        checkedBtn.addEventListener('click', function () { //при клике на checkedBtn меняем статус таски на true
            task.status = true;
            li.classList.add('checked')
            completedTaskContainer.appendChild(li); //добавляем ее в контейнер с выполненными тасками
            completedTask.appendChild(li); //добавляю ее в список с выполненными тасками ... 
            sync();
        });

        const deleteBtn = document.createElement("button"); //создаю кнопку удаления 
        deleteBtn.className = 'btn__delete';
        li.appendChild(deleteBtn); //добавляю ее в таску

        function deleteTask () {
            const index = taskList.findIndex((curr) => curr.id === task.id); //прохожусь по нашему массиву и ищу по нужному id
            // если id которое мы принимаем, равно тому же id по которому проходимся в массиве, то сохраняю индекс на том моменте, где совпал id в переменную
            if (index !== -1) { //если мы нашли подходящий индекс
            taskList.splice(index, 1); //удаляю 1 элем из списка начиная с индекса, который нашли
            sync();
            };
        }

        deleteBtn.addEventListener('click', deleteTask);
    });

    completedTask.forEach (taskDone => {
        const li = document.createElement("li");
        completedTaskContainer.appendChild(li);
        li.textContent = taskDone.textInput;
        li.appendChild(checkedBtn);
        li.appendChild(deleteBtn);
    });
}

addBtn.addEventListener('click', addTask);

// function deleteTask () {

// }





// function addTask () { //создаю таску
//     if (inputText === '') { //если в инпуте пусто, то вывожу алерт
//         alert("Введите текст") //почему-то не работает
//     } else { //если нет, то создаю новую таску
//         const li = document.createElement("li") //создаю li
//         li.innerHTML = inputText.value //помещаю в текст li значение из инпута
//         toDoTaskContainer.appendChild(li) //добавляю созданную таску сразу в контейнер to do

//         const deleteBtn = document.createElement("button") //создаю кнопку удаления (застилизовываю ее в css)
//         li.appendChild(deleteBtn) //добавляю ее в таску
//     }
//     inputText.value = '' //очищаю инпут после создания и добавления таски
// }

// addBtn.addEventListener("click", addTask)


// toDoTaskContainer.addEventListener('click', function(e) { //создаю действия в контейнере to do
//     if (e.target.tagName === 'LI') { //если мы кликнули на таску, то делаем ее checked
//         e.target.classList.toggle("checked")

//         if (e.target.classList.contains("checked")) { //если таска checked, то переношу ее в контейнер с завершенными тасками

//             completedTaskContainer.appendChild(e.target)
//         } else { //если нет то пусть так и остается в контейнере to do
//             toDoTaskContainer.appendChild(e.target)
//         }

//     } else if (e.target.tagName === 'BUTTON') { //если кликнули по button, то удаляем ее
//         e.target.parentElement.remove()
//     }
// })

// completedTaskContainer.addEventListener('click', function(e) { //прописала еще действия для контейнера где только удаляем уже checked таски
//     if (e.target.tagName === 'BUTTON') {
//         e.target.parentElement.remove()
//     }
// })

