import React, { useState } from "react";
import useTodoStore from "../app/store";

const TodoList = () => {
  const { todos, toggleComplete, deleteTodo, editTodo } = useTodoStore();
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (id, title) => {
    setEditId(id);
    setNewTitle(title);
  };

  const handleUpdate = (id) => {
    editTodo(id, newTitle);
    setEditId(null);
    setNewTitle("");
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {editId === todo.id ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button onClick={() => handleUpdate(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span>{todo.title}</span>
              <button onClick={() => toggleComplete(todo)}>
                {todo.completed}
              </button>
              <button onClick={() => handleEdit(todo.id, todo.title)}>
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
