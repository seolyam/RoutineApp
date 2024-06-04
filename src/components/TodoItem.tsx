import { Todo } from "../types/Todo";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
}
export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="flex">
      <label className=" flex gap-2 border rounded-md p-2 border-black bg-[#FAF8F1] hover:bg- grow">
        <input
          type="checkbox"
          className="scale-125 accent-[#726759]"
          onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
          checked={todo.completed}
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>
          <p className="">{todo.title}</p>
        </span>
      </label>
      <button onClick={() => onDelete(todo.id)}>
        <Trash2 className="text-[#FAF8f1]"></Trash2>
      </button>
    </div>
  );
}
