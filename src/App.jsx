import React, { useEffect } from "react";
import useTodoStore from "./app/store";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import "./App.css";

const App = () => {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      <h1>Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
