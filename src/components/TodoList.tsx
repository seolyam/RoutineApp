import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({
  todos,
  onCompletedChange,
  onDelete,
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
    </div>
  );
}
