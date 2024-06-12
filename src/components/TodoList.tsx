import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { DeleteIcon } from "lucide-react";
import Modal from "./Modal";
import moment from "moment-timezone";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
  toggleAllTodos: () => void;
  onEdit: (id: number, newTitle: string) => void;
  onDeleteAll: () => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
  toggleAllTodos,
  onEdit,
  onDeleteAll,
}: TodoListProps) {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const uncheckAllTodosAtMidnight = () => {
      const currentTime = moment.tz("Asia/Manila");
      const currentHour = currentTime.hour();
      const currentMinute = currentTime.minute();

      if (currentHour === 0 && currentMinute === 0) {
        toggleAllTodos();
      }
    };

    const intervalId = setInterval(uncheckAllTodosAtMidnight, 60000);

    return () => clearInterval(intervalId);
  }, [toggleAllTodos]);

  const todosSorted = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed ? 1 : -1;
  });

  const completedTodos = todos.filter((todo) => todo.completed);

  const handleDeleteAllClick = () => {
    setModalProps({
      title: "Confirm Delete",
      message:
        "Are you sure you want to delete all completed tasks? This action cannot be undone.",
      confirmText: "Yes, delete all",
      cancelText: "Cancel",
      onConfirm: handleConfirmDeleteAll,
    });
    setShowConfirmPopup(true);
  };

  const handleConfirmDeleteAll = () => {
    setShowConfirmPopup(false);
    onDeleteAll();
  };

  const handleCancelDeleteAll = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="space-y-2">
      {todosSorted.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCompletedChange={onCompletedChange}
          onDelete={onDelete}
          onEdit={onEdit}
          onDeleteAll={onDeleteAll}
        />
      ))}

      <div className="flex justify-end">
        {completedTodos.length > 1 && (
          <button
            onClick={handleDeleteAllClick}
            className="bg-[#d55c4f]  hover:bg-[#d55c4fd7] rounded-s-md w-16 pl-4 text-white "
          >
            <DeleteIcon />
          </button>
        )}
        {todos.length > 1 && (
          <button
            onClick={toggleAllTodos}
            className="px-4 py-2 bg-[#726759]  hover:bg-[#7c6d5b] text-white rounded"
          >
            {todos.every((todo) => todo.completed) ? "Reset" : "Complete"}
          </button>
        )}
      </div>

      <Modal
        isOpen={showConfirmPopup}
        title={modalProps.title}
        message={modalProps.message}
        confirmText={modalProps.confirmText}
        cancelText={modalProps.cancelText}
        onConfirm={modalProps.onConfirm}
        onCancel={handleCancelDeleteAll}
      />
    </div>
  );
}
