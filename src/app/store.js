import create from "zustand";

const useTodoStore = create((set) => ({
  todos: [],
  fetchTodos: async () => {
    const response = await fetch("http://localhost:3000/todos");
    const todos = await response.json();
    set({ todos });
  },
  addTodo: async (todo) => {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  toggleComplete: async (todo) => {
    const updatedTodo = {
      ...todo,
      completed: todo.completed === "❌" ? "✅" : "❌",
    };
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    set((state) => ({
      todos: state.todos.map((t) => (t.id === todo.id ? updatedTodo : t)),
    }));
  },
  deleteTodo: async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
  editTodo: async (id, title) => {
    const updatedTodo = {
      ...state.todos.find((todo) => todo.id === id),
      title,
    };
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    set((state) => ({
      todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
    }));
  },
}));

export default useTodoStore;
