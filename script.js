const API_URL = "https://dummyjson.com/todos"; // URL for get dummy data
const TODOS_PER_PAGE = 10;

let todos = [];
let currentPage = 1;

// DOM Elements
const todoList = document.getElementById("todoList");
const messageContainer = document.getElementById("messageContainer");
const currentPageText = document.getElementById("currentPage");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");

//Filter DOM Elements
const searchInput = document.getElementById("searchInput");
const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");





//  Show loading or error message
function showMessage(msg, isError = false) {
  messageContainer.textContent = msg;
  messageContainer.classList.remove("hidden");
  messageContainer.classList.toggle("text-red-600", isError);
  messageContainer.classList.toggle("text-blue-600", !isError);
}

//  Hide message
function hideMessage() {
  messageContainer.textContent = "";
  messageContainer.classList.add("hidden");
}






//  Fetch Todos from API
function getRandomDateWithinLastNDays(n) {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * n);
  const date = new Date(today.setDate(today.getDate() - randomDays));
  return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}


async function fetchTodos() {


  const localData = localStorage.getItem("todos");
  if (localData) {
    // Load from localStorage if available
    todos = JSON.parse(localData);
    renderTodos();
    return;
  }



  try {
    showMessage("Loading...", false);
    const response = await axios.get(API_URL);
    // console.log(response); for testing purpuse

    todos = response.data.todos.map((todo) => ({
      ...todo,
      createdAt: getRandomDateWithinLastNDays(30), // Simulate dates within last 30 days
    }));

    // console.log(todos); // for testing purpuse

    localStorage.setItem('todos',JSON.stringify(todos));

    hideMessage();
    renderTodos();
  } catch (error) {
    showMessage("Failed to load todos. Please try again.", true);
  }
  
}



//  Render Todos based on current page
function renderTodos() {
  // console.log(JSON.parse(localStorage.getItem('todos')));
  
  todoList.innerHTML = "";

  // ✅ Apply search and date filters
  const todolist =   JSON.parse(localStorage.getItem('todos')) || [];

  const filteredTodos = todolist.filter((todo) => {
    const searchTerm = searchInput.value.toLowerCase();
    const taskMatch = todo.todo.toLowerCase().includes(searchTerm);

    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;
    const created = todo.createdAt;

    // console.log(fromDate );
    // console.log(created );
    

    const dateMatch =
      (!fromDate || created >= fromDate) && (!toDate || created <= toDate);

    return taskMatch && dateMatch;
  });

  // ✅ Handle pagination on filtered data
  const start = (currentPage - 1) * TODOS_PER_PAGE;
  const end = start + TODOS_PER_PAGE;
  const paginatedTodos = filteredTodos.slice(start, end);

  if (paginatedTodos.length === 0) {
    todoList.innerHTML =
      '<p class="text-center text-gray-600">No todos found.</p>';
    return;
  }

  // ✅ Render todo items
  paginatedTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "p-4 bg-gray-100 rounded shadow";

    li.innerHTML = `
    <div class="flex justify-between items-center mb-1">
      <span class="font-medium text-gray-800">${todo.todo}</span>
      <span class="text-sm ${
        todo.completed ? "text-green-600" : "text-yellow-600"
      }">
        ${todo.completed ? " Done" : " Pending"}
      </span>
    </div>
    <div class="text-sm text-gray-500">
      Created on: ${todo.createdAt}
    </div>
  `;

    todoList.appendChild(li);
  });

  currentPageText.textContent = `Page ${currentPage}`;
}




//  Handle Pagination
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTodos();
  }
});

nextPageBtn.addEventListener("click", () => {
  const maxPage = Math.ceil(todos.length / TODOS_PER_PAGE);
  if (currentPage < maxPage) {
    currentPage++;
    renderTodos();
  }
});





// input listeners to re-render filtered todos--
searchInput.addEventListener('input', () => {
  currentPage = 1;
  renderTodos();
});

fromDateInput.addEventListener('change', () => {
  currentPage = 1;
  renderTodos();
});

toDateInput.addEventListener('change', () => {
  currentPage = 1;
  renderTodos();
});




// add todo ___________
addTodoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTask = todoInput.value.trim();

  if (newTask === "") return;

  try {
    showMessage("Adding todo...", false);

    const response = await axios.post("https://dummyjson.com/todos/add", {
      todo: newTask,
      completed: false,
      userId: 5, 
    });
    // console.log(response);

    // Simulate createdAt field
    const newTodo = {
      ...response.data,
      createdAt: new Date().toISOString().split("T")[0],
    };

    // Add new todo to top of list
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.unshift(newTodo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
    todos.unshift(newTodo);


    currentPage = 1;
    todoInput.value = ""; // Clear input
    hideMessage();
    renderTodos();
  } catch (error) {
    showMessage("Failed to add todo. Try again.", true);
  }
});




//  Initial Load Function _____________________
fetchTodos();
