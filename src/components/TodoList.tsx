import { useEffect, useState, Fragment } from "react";
import { Todo } from "../types/Todo";
import TodoItem from "./TodoItem";
import { DeleteIcon } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";

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

  const handleDeleteAllClick = () => {
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

      <Transition appear show={showConfirmPopup} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleCancelDeleteAll}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex min-h-full items-center justify-center px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Delete
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete all the selected tasks?
                      This action cannot be undone.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleConfirmDeleteAll}
                    >
                      Yes, delete all
                    </button>
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={handleCancelDeleteAll}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
