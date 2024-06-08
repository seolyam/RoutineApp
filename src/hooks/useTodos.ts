import { useEffect, useState } from "react";
import { dummyData } from "../data/todos";
import { Todo } from "../types/Todo";

export default function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function completeTodo(id: number) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(id: number, newTitle: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }

  function deleteAllTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function toggleAllTodos() {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: !allCompleted }))
    );
  }

  function addTodo(title: string) {
    if (!localStorage.getItem("hasAddedTaskBefore")) {
      setShowPopup(true);
      localStorage.setItem("hasAddedTaskBefore", "true");
    }
    setTodos((prevTodos) => [
      {
        id: Date.now(),
        title,
        completed: false,
      },
      ...prevTodos,
    ]);
  }
  return {
    addTodo,
    completeTodo,
    todos,
    deleteTodo,
    toggleAllTodos,
    editTodo,
    showPopup,
    setShowPopup,
    deleteAllTodos,
  };
}
