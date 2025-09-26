const inputText = document.getElementById("inputText")
const addBtn = document.getElementById("addBtn")
const tasks = document.getElementById("tasks")

const noTaskContainer = document.querySelector(".list_no-task")
const toDoTaskContainer = document.querySelector(".list_to-do")
const completedTaskContainer = document.querySelector(".list_completed")

const noTaskContainerTitle = document.querySelector(".container__no-task_empty")

// const taskList = []

// function addTask () { // функция создания новой таски
//     const textInput = inputText.value //храню здесь значение инпута
//     if (inputText.value === "") return; // если значение инпута пустое, то выходим
//     const newTask = { // создаем новую таску объектом
//         textInput, 
//         status: false,
//         id: crypto.randomUUID() // генерим рандомный id
//     };
//     taskList.push(newTask) // добавляем новую таску в массив

//     inputText.value = ""; // очищаем инпут
//     sync(); //вызываем основную функцию
// }

// function sync () {
// const taskList = []
//     const toDoTask = taskList.filter(newTask => !newTask.status); //создаем переменную, где будем хранить таски, которые надо сделать (если статус таски true, значит ее надо делать). Берем ее из списка
//     const completedTask = taskList.filter(newTask => newTask.status); //создаем переменную с выполненными тасками (у которых false)

//     toDoTask.forEach(task => {// проходимся по каждому элементу таски, которые нам нужно сделать
        
//     }
//     );
// }

// addBtn.addEventListener('click', addTask);


// function createTask (task) { //отрисовка таски
    
// }





function addTask () { //создаю таску
    if (inputText === '') { //если в инпуте пусто, то вывожу алерт
        alert("Введите текст") //почему-то не работает
    } else { //если нет, то создаю новую таску
        const li = document.createElement("li") //создаю li
        li.innerHTML = inputText.value //помещаю в текст li значение из инпута
        toDoTaskContainer.appendChild(li) //добавляю созданную таску сразу в контейнер to do

        const deleteBtn = document.createElement("button") //создаю кнопку удаления (застилизовываю ее в css)
        li.appendChild(deleteBtn) //добавляю ее в таску
    }
    inputText.value = '' //очищаю инпут после создания и добавления таски
}

addBtn.addEventListener("click", addTask)


toDoTaskContainer.addEventListener('click', function(e) { //создаю действия в контейнере to do
    if (e.target.tagName === 'LI') { //если мы кликнули на таску, то делаем ее checked
        e.target.classList.toggle("checked")

        if (e.target.classList.contains("checked")) { //если таска checked, то переношу ее в контейнер с завершенными тасками

            completedTaskContainer.appendChild(e.target)
        } else { //если нет то пусть так и остается в контейнере to do
            toDoTaskContainer.appendChild(e.target)
        }

    } else if (e.target.tagName === 'BUTTON') { //если кликнули по button, то удаляем ее
        e.target.parentElement.remove()
    }
})

completedTaskContainer.addEventListener('click', function(e) { //прописала еще действия для контейнера где только удаляем уже checked таски
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove()
    }
})

