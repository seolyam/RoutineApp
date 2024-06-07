import NavigationBar from "./components/NavigationBar";
import AddTodoForm from "./components/AddTodoForm";
import useTodos from "./hooks/useTodos";
import TodoList from "./components/TodoList";

function App() {
  const { todos, addTodo, completeTodo, deleteTodo, toggleAllTodos, editTodo } =
    useTodos();

  return (
    <>
      <NavigationBar />

      <main className="py-10 h-screen space-y-5 overflow-y-auto ">
        <h1 className="font-thin text-3xl text-center">Your Routine</h1>
        <div className="max-w-lg mx-auto border-2 rounded-lg border-[#726759] bg-[#D8968F] p-5 space-y-2">
          <AddTodoForm onSubmit={addTodo} />
          <TodoList
            todos={todos}
            onCompletedChange={completeTodo}
            onDelete={deleteTodo}
            toggleAllTodos={toggleAllTodos}
            onEdit={editTodo}
          />
        </div>
      </main>
    </>
  );
}

export default App;
