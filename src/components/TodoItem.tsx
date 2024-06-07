import { Todo } from "../types/Todo";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}
export default function TodoItem({
  todo,
  onCompletedChange,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing && newTitle.trim() !== "") {
      onEdit(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex gap-1">
      <label className=" flex border rounded-md p-2 border-black bg-[#FAF8F1] hover:bg- grow justify-between">
        <div className="flex gap-2">
          <input
            type="checkbox"
            className="scale-125 accent-[#726759]"
            onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
            checked={todo.completed}
          />
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleEdit}
              className="border rounded p-1"
            />
          ) : (
            <span
              className={todo.completed ? "line-through text-gray-400" : ""}
            >
              <p className="flex mb-1">{todo.title}</p>
            </span>
          )}
        </div>
        <button className="flex" onClick={handleEdit}>
          <Pencil className="scale-75 text-[#FAF8F1] hover:text-[#726759] " />
        </button>
      </label>
      <button onClick={() => onDelete(todo.id)}>
        <Trash2 className="text-[#FAF8f1] mb-1"></Trash2>
      </button>
    </div>
  );
}
