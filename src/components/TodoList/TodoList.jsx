import React, { useEffect, useState } from "react";
import AddToDo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";

export default function TodoList({ filter }) {
  const [todos, setTodo] = useState(() => readTodosFromLocalstorage());
  const handleAdd = (todo) => setTodo([...todos, todo]);

  const handleUpdate = (updated) =>
    setTodo(todos.map((t) => (t.id === updated.id ? updated : t)));

  const handleDelete = (deleted) =>
    setTodo(todos.filter((t) => t.id !== deleted.id));

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const filterd = getFilterdItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filterd.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          ></Todo>
        ))}
      </ul>
      <AddToDo onAdd={handleAdd} />
    </section>
  );
}
function readTodosFromLocalstorage() {
  console.log("readTodosFromLocalstorage");
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}

function getFilterdItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
