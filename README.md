# 📝 Todo List App

A fully functional Todo List application built using **HTML**, **Tailwind CSS**, **JavaScript (ES6)**, **Axios**, and the [DummyJSON API](https://dummyjson.com/). It supports adding, filtering, paginating, and storing todos in localStorage.


## Live Project Link

[Link](https://to-do-111.netlify.app/)

---


---

## ⚙️ How It Works

### 🔹 Initial Load
- Checks if `todos` are available in `localStorage`.
- If not, fetches todos from `https://dummyjson.com/todos`.
- Simulates a `createdAt` date for each todo (within the last 30 days).
- Saves fetched todos to localStorage for persistence.

### 🔹 Add Todo
- Submits a `POST` request to the API (`/todos/add`) when the form is submitted.
- Appends the new todo to the top of the list.
- Adds `createdAt` to simulate creation date.
- Updates localStorage with the new todo.

### 🔹 Search & Filter
- **Search**: Real-time case-insensitive filter by task name.
- **Date Filter**: Supports filtering by `fromDate` and `toDate` fields.

### 🔹 Pagination
- Shows **10 todos per page**.
- Includes **Prev** and **Next** buttons.
- Works on filtered results.

---

## 📦 API Used

- **Base URL:** `https://dummyjson.com/todos`
- **Add Todo:** `https://dummyjson.com/todos/add`

---








---

## 💻 Getting Started

1. **Clone or download this repository**
2. Open `index.html` directly in your browser
3. Start using the Todo app! 🎉

> No server or build tool is needed. It works entirely in the browser.

---

## 📸 UI Preview

![UI Preview](https://to-do-111.netlify.app/)

---

## 🧠 Author & Credits

Developed by **[Ravi Ranjan Kumar]**  
Inspired by common frontend coding interview tasks.

---

## 📃 License

This project is open-source and free to use for educational or personal use.

---

## 🔧 Technologies Used

- HTML5
- Tailwind CSS CDN
- JavaScript ES6
- Axios
- DummyJSON API
- LocalStorage


