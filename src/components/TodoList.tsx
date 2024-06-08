import { useEffect } from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { DeleteIcon } from "lucide-react";

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
  useEffect(() => {
    const uncheckAllTodosAtMidnight = () => {
      const currentTime = new Date();
      const currentHourInPH = currentTime.getUTCHours() + 8;

      if (currentHourInPH === 0) {
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
            onClick={onDeleteAll}
            className="bg-[#d55c4f] rounded-s-md w-16 pl-4 text-white "
          >
            <DeleteIcon />
          </button>
        )}
        {todos.length > 1 && (
          <button
            onClick={toggleAllTodos}
            className="px-4 py-2 bg-[#726759] text-white rounded"
          >
            {todos.every((todo) => todo.completed) ? "Reset" : "Complete"}
          </button>
        )}
      </div>
    </div>
  );
}
