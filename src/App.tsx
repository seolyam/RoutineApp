import NavigationBar from "./components/NavigationBar";
import AddTodoForm from "./components/AddTodoForm";
import useTodos from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import Popup from "./components/Popup";

function App() {
  const {
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
    toggleAllTodos,
    editTodo,
    setShowPopup,
    showPopup,
    deleteAllTodos,
  } = useTodos();

  return (
    <>
      <NavigationBar />

      <main className="py-10 h-screen space-y-5 overflow-y-auto bg-[#FAF8F1]">
        <h1 className="font-thin text-3xl text-center">Your Routine</h1>
        <div className="max-w-lg mx-auto border-2 rounded-lg border-[#726759] bg-[#D8968F] p-5 space-y-2">
          <AddTodoForm onSubmit={addTodo} />
          <TodoList
            todos={todos}
            onCompletedChange={completeTodo}
            onDelete={deleteTodo}
            toggleAllTodos={toggleAllTodos}
            onEdit={editTodo}
            onDeleteAll={deleteAllTodos}
          />
        </div>
      </main>
      {showPopup && (
        <Popup
          message="This Routine App is still in progress and the tasks added can only be saved by the local machine."
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
}

export default App;
