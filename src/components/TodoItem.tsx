import { Todo } from "../types/Todo";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, complete: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  onDeleteAll: (id: number) => void;
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

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(todo.id);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
      <button onClick={handleDeleteClick}>
        <Trash2 className="text-[#FAF8f1] mb-1"></Trash2>
      </button>
      <Modal
        isOpen={showDeleteModal}
        title="Confirm Delete"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Yes, delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
