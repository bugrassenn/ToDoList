const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const savedTodosJSON = localStorage.getItem("todos");
const savedTodos = savedTodosJSON ? JSON.parse(savedTodosJSON) : [];

for (const todo of savedTodos) {
  // savedtodosları dolaş ve her birini todo olarak döndür ve todoları listeye ekle
  addTodoToList(todo);
}

// todo ekleme
function addTodo() {
  const todoText = todoInput.value.trim(); // inputa yazılan yazıyı alıyoruz trim boşlukları siler
  if (todoText === "") return; // boşsa hiçbir şey yapma

  const todo = {
    id: Date.now(), // benzersiz id olması için  Date.now kullandık
    text: todoText,
    completed: false,
    date: Date(),
  };

  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos)); // todo yu localstro a kaydet
  addTodoToList(todo);
  todoInput.value = "";
}

function addTodoToList(todo) {
  const li = document.createElement("li");
  li.setAttribute("id", todo.id);
  li.style.display = "flex";
  li.innerHTML = `
                <span class="flex-1 overflow-hidden whitespace-nowrap truncate border-b border-black border-opacity-20" title="${todo.text}">${todo.text}</span>
                <button onClick = "toggleComplete(${todo.id})" class="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs lg:text-xl hover:text-black text-white font-bold px-2 py-1 rounded ml-2">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button onClick = "editTodo(${todo.id})" class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-black text-xs lg:text-xl text-white font-bold px-2 rounded ml-2">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button OnClick = "removeTodo(${todo.id})"class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-black text-xs lg:text-xl text-white font-bold px-2 rounded ml-2">
                <i class="fa-solid fa-trash"></i>
                </button>
                <button OnClick = "Info(${todo.id})" class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-black text-xs lg:text-xl text-white font-bold px-2 rounded ml-2">
                <i class="fa-solid fa-circle-info"></i>
                </button>
    `;

  li.classList.toggle("completed", todo.completed);
  todoList.appendChild(li);
}

// tamamlandı durumu değiştirme fonks.
function toggleComplete(id) {
  const todo = savedTodos.find((todo) => todo.id === id);
  todo.completed = !todo.completed; // todo tamamlandı olsun tamamlandıysa tamamlanmadı olsun

  localStorage.setItem("todos", JSON.stringify(savedTodos));
  const todoElement = document.getElementById(id);
  todoElement.classList.toggle("completed", todo.completed);
}

// todo düzenleme fonksiyonu
function editTodo(id) {
  const todo = savedTodos.find((todo) => todo.id === id);
  const newText = prompt("Görevi Düzenleyin", todo.text);

  if (newText.trim() === "") {
    alert("Lütfen boş değer girmeyiniz");
  } else {
    todo.text = newText.trim();
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    const todoElement = document.getElementById(id);
    todoElement.querySelector("span").textContent = newText;
  }
}

// silme fonks.
function removeTodo(id) {
  const todoElement = document.getElementById(id);
  todoElement.style.animation = "fadeOut 0.3s ease";
  setTimeout(() => {
    savedTodos.splice(
      // id yi bul ve 1 karakter ilerle dedik
      savedTodos.findIndex((todo) => todo.id === id),
      1
    );
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    todoElement.remove();
  }, 300);
}

function Info(id) {
  const todo = savedTodos.find((todo) => todo.id === id);
  alert(todo.date);
}
