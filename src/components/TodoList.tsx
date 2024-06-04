import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
  toggleAllTodos: () => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
  toggleAllTodos,
}: TodoListProps) {
  const todosSorted = todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div className="space-y-2">
      {todosSorted.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCompletedChange={onCompletedChange}
          onDelete={onDelete}
        />
      ))}

      <div className="flex justify-end">
        <button
          onClick={toggleAllTodos}
          className="px-4 py-2 bg-[#726759] text-white rounded"
        >
          {todos.every((todo) => todo.completed) ? "Uncheck All" : "Check All"}
        </button>
      </div>
    </div>
  );
}
